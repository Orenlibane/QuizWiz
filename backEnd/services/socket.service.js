const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    io.emit('returnAllLiveGames', gameService.getAllonlineGames());

    // SERVER GLOBAL TIME SEND
    // setInterval(() => {
    //   socket.emit('serverTime', Date.now());
    // }, 1000);

    socket.on('loggingToGame', infoToLog => {
      socket.join(infoToLog.gameId);
      let newUser = gameService.joinGame(infoToLog.gameId, infoToLog.user);
      io.to(infoToLog.gameId).emit('loggedUser', newUser);

      socket.on('updateAns', answer => {
        let currGame = gameService.getGameById(infoToLog.gameId);
        gameService.setAnswer(currGame._id, answer.userId, answer.answerInfo);
      });
    });

    socket.on('onCreateGame', quiz => {
      var newGame = gameService.createGame(quiz);
      io.emit('returnAllLiveGames', gameService.getAllonlineGames());
      //Create and join the room
      socket.join(newGame._id);
      console.log('created the game on:', newGame._id);

      //join the game creator into game on the service
      var user = gameService.joinGame(newGame._id, quiz.creator);

      // sending the connected users names into the loby
      io.to(newGame._id).emit('loggedUser', user);
      //sending the signal to start the 20 sec lobby timer
      let lobbyTimer = 20;
      let lobbyTimerInterval = setInterval(() => {
        io.to(newGame._id).emit('sendLobbyTimer', lobbyTimer); //need to send server time insted
        lobbyTimer--;
        if (lobbyTimer === 0) clearInterval(lobbyTimerInterval);
      }, 1000);

      let gameInterval;
      setTimeout(() => {
        gameInterval = setInterval(moveQuiz, 10000, newGame, io);
      }, 15000);

      function moveQuiz(newGame, io) {
        if (newGame.status === 'lobby' || newGame.status === 'middle') {
          if (newGame.currQuest === newGame.quiz.quests.length) {
            newGame.currQuest--;
            newGame.status = 'endGame';
            io.to(newGame._id).emit('endGame', newGame); //send to everyone who is in the room
            clearInterval(gameInterval);
            //SEND TO DATABASE
            //TRYING TO RESET CLIENT //TODO: patch to check

            // setTimeout(() => {
            //   io.to(newGame._id).emit('backToStart'); //send to everyone who is in the room
            // }, 7000);
            gameService.removeGame(newGame._id); //when changed we dont need it
            io.emit('returnAllLiveGames', gameService.getAllonlineGames());
            return;
          }
          //TODO:this should prevent showing it on home page screen
          // if (newGame.gameType === 'mult') {
          //   newGame.isGameOn = true;
          //   io.emit('returnAllLiveGames', gameService.getAllonlineGames());
          // }
          newGame.status = 'quest';
          io.to(newGame._id).emit('quizQuest');
        } else if (newGame.status === 'quest') {
          newGame.status = 'middle';
          io.to(newGame._id).emit('middleQuiz', newGame);
          newGame.currQuest++;
          io.to(newGame._id).emit('questionChange', newGame.currQuest);
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
