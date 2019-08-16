'use strict';
const socketIO = require('socket.io');
const gameService = require('./game-service');
const TIME_PER_GAME_PART = 10000;

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    let currGame;
    socket.emit('returnAllLiveGames', gameService.getAllonlineGames());

    socket.on('loggingToGame', infoToLog => {
      socket.join(infoToLog.gameId);
      currGame = gameService.getGameById(infoToLog.gameId);

      gameService.joinGame(infoToLog.gameId, infoToLog.user);
      sendLoggedUsersToClient('preGame', io, infoToLog.gameId, currGame);

      socket.on('disconnect', function(socket) {
        // logic for DC of joined USER
      });
    });
    socket.on('updateAns', answer => {
      gameService.setAnswer(currGame._id, answer.userId, answer.answerInfo);
    });

    socket.on('onCreateGame', quiz => {
      currGame = createAndJoinGame(quiz, socket);
      sendLoggedUsersToClient('preGame', io, currGame._id, currGame);

      let timeForGameStart = null;
      if (quiz.gameType === 'single') {
        startLobbyTimer(currGame._id, 10);
        timeForGameStart = 1000;
      } else {
        startLobbyTimer(currGame._id, 60);
        timeForGameStart = 51000;
      }

      let gameInterval;
      setTimeout(() => {
        gameInterval = setInterval(
          gameSequence,
          TIME_PER_GAME_PART,
          currGame,
          io
        );
      }, timeForGameStart);

      socket.on('disconnect', function(socket) {
        // logic for DC of game Creator
      });

      console.log('length questions', currGame.quiz.quests.length);
      function gameSequence(currGame, io) {
        console.log('making choice', 'the current status is', currGame.status);
        console.log(
          'Check for ENDGAME for multi',
          currGame.currQuest === currGame.quiz.quests.length
        );
        // console.log(
        //   'Check for ENDGAME for single',
        //   currGame.currQuest === currGame.quiz.quests.length - 1
        // );
        console.log('curr Question before entering', currGame.currQuest);

        if (
          (currGame.currQuest === currGame.quiz.quests.length - 1 &&
            currGame.gameType === 'single') ||
          (currGame.currQuest === currGame.quiz.quests.length &&
            currGame.gameType === 'mult')
        ) {
          handleEndGame(currGame, io, gameInterval);
          return;
        } else if (
          currGame.status === 'lobby' ||
          currGame.status === 'middle'
        ) {
          if (quiz.gameType === 'mult' || currGame.status === 'lobby') {
            afterMiddleOrLobby(currGame, io);
          }
        } else if (currGame.status === 'quest') {
          afterQuest(currGame, io);
          console.log(
            'curr Question before entering after quest',
            currGame.currQuest
          );
        }
      }
    });
  });
}

module.exports = {
  setup
};

//Socket Service functions

function startLobbyTimer(gameId, lobbyTimer) {
  let lobbyTimerInterval = setInterval(() => {
    io.to(gameId).emit('sendLobbyTimer', lobbyTimer);
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

function handleEndGame(currGame, io, gameInterval) {
  currGame.currQuest--;
  currGame.status = 'endGame';
  io.to(currGame._id).emit('endGame', currGame);
  clearInterval(gameInterval);

  gameService.removeGame(currGame._id);
  sendLoggedUsersToClient('endGame', io, currGame._id);
  io.emit('returnAllLiveGames', gameService.getAllonlineGames());
}

function afterQuest(newGame, io) {
  if (newGame.gameType === 'mult') {
    newGame.status = 'middle';
    io.to(newGame._id).emit('middleQuiz', newGame);
  }
  newGame.currQuest++;
  io.to(newGame._id).emit('questionChange', newGame.currQuest);
}

function afterMiddleOrLobby(newGame, io) {
  newGame.isGameOn = true;
  io.emit('returnAllLiveGames', gameService.getAllonlineGames());
  newGame.status = 'quest';
  io.to(newGame._id).emit('quizQuest');
}

function sendLoggedUsersToClient(state, io, gameId, game) {
  if (state === 'preGame') {
    io.to(gameId).emit('loggedUsers', game.gamePlayers);
  } else if (state === 'endGame') {
    io.to(gameId).emit('loggedUsers', []);
  }
}
