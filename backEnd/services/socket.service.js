const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
let currGame;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    io.emit('returnAllLiveGames', gameService.getAllonlineGames());

    socket.on('loggingToGame', infoToLog => {
      socket.join(infoToLog.gameId);
      console.log('Sent when logged to game', infoToLog.gameId);
      currGame = gameService.getGameById(infoToLog.gameId);
      console.log('GameId when found', currGame._id);

      gameService.joinGame(infoToLog.gameId, infoToLog.user);
      sendLoggedUsersToClient(io, infoToLog.gameId, currGame);

      socket.on('updateAns', answer => {
        console.log('GameId after answer', currGame._id);
        gameService.setAnswer(currGame._id, answer.userId, answer.answerInfo);
      });
    });

    socket.on('onCreateGame', quiz => {
      let newGame = createAndJoinGame(quiz, socket);
      sendLoggedUsersToClient(io, newGame._id, newGame);
      startLobbyTimer(newGame._id);

      let gameInterval;
      startGameSequence(gameSequence, 7000, newGame, io);

      function gameSequence(newGame, io) {
        if (newGame.currQuest === newGame.quiz.quests.length) {
          console.log('end');
          handleEndGame(newGame);
          return;
        } else if (newGame.status === 'lobby' || newGame.status === 'middle') {
          console.log('lobb/mid');
          afterMiddleOrLobby(newGame, io);
        } else if (newGame.status === 'quest') {
          console.log('quest');
          afterQuest(newGame, io);
        }
      }
      socket.on('updateAns', answer => {
        gameService.setAnswer(newGame._id, answer.userId, answer.answerInfo);
      });
    });
  });
}

module.exports = {
  setup
};

//Socket Service functions

function startLobbyTimer(gameId) {
  let lobbyTimer = 30;
  let lobbyTimerInterval = setInterval(() => {
    io.to(gameId).emit('sendLobbyTimer', lobbyTimer); //need to send server time insted
    lobbyTimer--;
    if (lobbyTimer === 0) clearInterval(lobbyTimerInterval);
  }, 1000);
}

function createAndJoinGame(quiz, socket) {
  let createdGame = gameService.createGame(quiz);
  socket.join(createdGame._id);
  io.emit('returnAllLiveGames', gameService.getAllonlineGames());
  gameService.joinGame(createdGame._id, quiz.creator);
  return createdGame;
}

function startGameSequence(gameSequence, timeForPart, newGame, io) {
  setTimeout(() => {
    gameInterval = setInterval(gameSequence, timeForPart, newGame, io);
  }, 21000);
}

function handleEndGame(newGame) {
  newGame.currQuest--;
  newGame.status = 'endGame';
  io.to(newGame._id).emit('endGame', newGame);
  clearInterval(gameInterval);
  //SHOULD SEND TO DATABASE
  setTimeout(() => {
    io.to(newGame._id).emit('backToStart');
  }, 8000);
  gameService.removeGame(newGame._id);
  io.emit('returnAllLiveGames', gameService.getAllonlineGames());
}

function afterQuest(newGame, io) {
  newGame.status = 'middle';
  io.to(newGame._id).emit('middleQuiz', newGame);
  newGame.currQuest++;
  io.to(newGame._id).emit('questionChange', newGame.currQuest);
}

function afterMiddleOrLobby(newGame, io) {
  newGame.isGameOn = true;
  io.emit('returnAllLiveGames', gameService.getAllonlineGames());
  newGame.status = 'quest';
  io.to(newGame._id).emit('quizQuest');
}

function sendLoggedUsersToClient(io, gameId, game) {
  io.to(gameId).emit('loggedUsers', game.gamePlayers);
}

// function gameSequence(newGame, io) {
//   if (newGame.status === 'lobby' || newGame.status === 'middle') {
//     if (newGame.currQuest === newGame.quiz.quests.length) {
//       handleEndGame(newGame);
//       return;
//     } else {
//       afterMiddleOrLobby(newGame, io);
//     }
//   } else if (newGame.status === 'quest') {
//     afterQuest(newGame, io);
//   }
// }
