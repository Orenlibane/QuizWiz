const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function (socket) {
    // SERVER GLOBAL TIME SEND
    setInterval(() => {
      socket.emit('serverTime', Date.now());
      // console.log('regregre');
    }, 200);

    socket.on('onCreateGame', quiz => {
      let currentQuestion = 0;

      const newGame = gameService.createGame(quiz);
      //Create and join the room
      socket.join(newGame._id);
      //join the game creator into game on the service
      var playerId = gameService.joinGame(newGame._id);
      socket.emit('startGameTimer');
      setInterval(moveQuiz, 5000);
      // function moveQuiz(game) {
      //   if (game.status === 'lobby' || 'middle') {
      //     game.status = 'quest';
      //     socket.emit();
      //     // if
      //   }
      }

      //LOBBY COUNTDOWN TO 5
      setTimeout(() => {
        socket.emit('startTheGame');

        setTimeout(() => {
          let currentGame = gameService.getGameById(newGame._id);
          socket.emit('middleQuiz', currentGame);
          currentQuestion++;
          socket.emit('questionChange', { currentQuestion });
        }, 5000);

        const interval = setInterval(() => {
          if (currentQuestion === newGame.quiz.quests.length) {
            let currentGame = gameService.getGameById(newGame._id);
            socket.emit('endGame', currentGame);
            clearInterval(interval);
          } else {
            setTimeout(() => {
              socket.emit('quizQuest');
              setTimeout(() => {
                let currentGame = gameService.getGameById(newGame._id);
                socket.emit('middleQuiz', currentGame);
                currentQuestion++;
                socket.emit('questionChange', { currentQuestion });
              }, 5000);
            }, 5000);
          }
        }, 11000);
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
