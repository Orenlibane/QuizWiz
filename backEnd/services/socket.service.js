const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    // SERVER GLOBAL TIME SEND
    setInterval(() => {
      socket.emit('serverTime', Date.now());
      // console.log('regregre');
    }, 200);

    socket.on('onCreateGame', function(quiz) {
      let currentQuestion = 0;
      let interval = null;
      const newGame = gameService.createGame(quiz);
      //Create and join the room
      socket.join(newGame._id);
      //join the game creator into game on the service
      var playerId = gameService.joinGame(newGame._id);
      console.log('this is the creating of the player ID', playerId);
      //for debugging - checking the current games
      const allGames = gameService.getAllonlineGames();
      // console.log(allGames);
      socket.emit('startGameTimer');
      //count to 30
      setTimeout(() => {
        socket.emit('startTheGame', quiz);
        console.log('sent the start game from server');
        socket.emit('questionChange', { currentQuestion });
        interval = setInterval(() => {
          setTimeout(() => {
            let currentGame = gameService.getGameById(newGame._id);
            console.log('currentGame', currentGame);
            socket.emit('middleQuiz', currentGame);
          }, 10000);

          setTimeout(() => {
            socket.emit('quizQuest');
            console.log('currentQuestion', currentQuestion);
            currentQuestion++;
            socket.emit('questionChange', { currentQuestion });
          }, 20000);
          console.log('checking var', newGame);
          console.log('checking var quiz as function', newGame.quiz);
          if (currentQuestion + 1 > newGame.quiz.quests.length) {
            let currentGame = gameService.getGameById(newGame._id);
            socket.emit('endGame', currentGame);
            clearInterval(interval);
          }
        }, 20000);
      }, 5000);
      socket.on('updateAns', answer => {
        gameService.setAnswer(newGame._id, playerId, answer);
      });
    });

    //socket.on(user join)
    //socket.on(user leave)
  });
}

module.exports = {
  setup
};
