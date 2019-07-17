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
        socket.emit('questionChange', { currentQuestion });
        const interval = setInterval(() => {
          setTimeout(() => {
            let currentGame = gameService.getGameById(newGame._id);
            socket.emit('middleQuiz', currentGame);
          }, 10000);

          setTimeout(() => {
            socket.emit('quizQuest');
            currentQuestion++;
            socket.emit('questionChange', { currentQuestion });
          }, 20000);
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
