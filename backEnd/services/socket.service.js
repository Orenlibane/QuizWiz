const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    let currGame;
    io.emit('returnAllLiveGames', gameService.getAllonlineGames());

    socket.on('loggingToGame', infoToLog => {
      socket.join(infoToLog.gameId);
      currGame = gameService.getGameById(infoToLog.gameId);

      gameService.joinGame(infoToLog.gameId, infoToLog.user);
      sendLoggedUsersToClient(io, infoToLog.gameId, currGame);
    });
    socket.on('updateAns', answer => {
      gameService.setAnswer(currGame._id, answer.userId, answer.answerInfo);
    });

    socket.on('onCreateGame', quiz => {
      currGame = createAndJoinGame(quiz, socket);
      sendLoggedUsersToClient(io, currGame._id, currGame);
      startLobbyTimer(currGame._id);

      let gameInterval;
      startGameSequence(gameSequence, 5000, currGame, io);

      function gameSequence(currGame, io) {
        console.log('CurrGame', currGame);
        if (currGame.currQuest === currGame.quiz.quests.length) {
          console.log('end');
          handleEndGame(currGame, io);
          return;
        } else if (
          currGame.status === 'lobby' ||
          currGame.status === 'middle'
        ) {
          console.log('lobb/mid');
          afterMiddleOrLobby(currGame, io);
        } else if (currGame.status === 'quest') {
          if (currGame.currQuest === currGame.quiz.quests.length) {
            console.log('end');
            handleEndGame(currGame, io);
            return;
          } else {
            console.log('quest');
            afterQuest(currGame, io);
          }
        }
      }
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
  }, 25000);
}

function handleEndGame(newGame, io) {
  newGame.currQuest--;
  newGame.status = 'endGame';
  io.to(newGame._id).emit('endGame', newGame);
  clearInterval(gameInterval);
  //SHOULD SEND TO DATABASE

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
