const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    //SERVER GLOBAL TIME SEND
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
      gameService.joinGame(newGame._id);
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
            socket.emit('middleQuiz');
          }, 10000);

          setTimeout(() => {
            socket.emit('quizQuest');
            console.log('currentQuestion', currentQuestion);
            currentQuestion++;
            socket.emit('questionChange', { currentQuestion });
          }, 20000);

          if (currentQuestion + 1 > newGame.quiz.quests.length) {
            socket.emit('endGame');
            clearInterval(interval);
          }
        }, 20000);
      }, 5000);
    });

    //socket.on(user join)
    //socket.on(user leave)
  });
}

module.exports = {
  setup
};
