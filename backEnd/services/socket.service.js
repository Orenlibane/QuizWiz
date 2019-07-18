const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);

  io.on('connection', function(socket) {
    // SERVER GLOBAL TIME SEND
    // setInterval(() => {
    //   socket.emit('serverTime', Date.now());
    //   // console.log('regregre');
    // }, 200);

    socket.on('onCreateGame', quiz => {
      let currentQuestion = 0;

      var newGame = gameService.createGame(quiz);
      //Create and join the room
      socket.join(newGame._id);

      //join the game creator into game on the service
      var player = gameService.joinGame(newGame._id);

      //TESTING -> sending the connected players names into the loby
      socket.emit('loggedUser', player);

      //sending the signle to start the 5 sec lobby timer
      socket.emit('startGameTimer');

      //---------------------------------------------------------------------------

      // WAY TO SIMPLIFIY THE CODE WITH TIMEOUTS
      // var gameInterval = setInterval(moveQuiz, 5000, newGame);

      // function moveQuiz(newGame) {
      //   console.log('stat');
      //   if (newGame.status === 'lobby' || 'middle') {
      //     newGame.status = 'quest';
      //     socket.emit('quizQuest');
      //     if (newGame.currQuest === newGame.quiz.quests.length) {
      //       newGame.status = 'endGame';
      //       socket.emit('endGame', newGame);
      //       clearInterval(gameInterval);
      //     }
      //   } else if (newGame.status === 'quest') {
      //     newGame.status = 'middle';
      //     socket.emit('middleQuiz', newGame);
      //     newGame.currQuest++;
      //     socket.emit('questionChange', { currentQuestion });
      //   }
      // }

      //----------------------------------------------------------------------------------------

      //LOBBY COUNTDOWN TO 5
      setTimeout(() => {
        socket.emit('startTheGame');

        setTimeout(() => {
          socket.emit('middleQuiz', newGame);
          currentQuestion++;
          socket.emit('questionChange', { currentQuestion });
        }, 5000);

        const interval = setInterval(() => {
          if (currentQuestion === newGame.quiz.quests.length) {
            socket.emit('endGame', newGame);
            clearInterval(interval);
            socket.leave(newGame._id);
            gameService.removeGame(newGame._id);
            console.log(newGame);
          } else {
            setTimeout(() => {
              socket.emit('quizQuest');
              setTimeout(() => {
                socket.emit('middleQuiz', newGame);
                currentQuestion++;
                socket.emit('questionChange', { currentQuestion });
              }, 5000);
            }, 5000);
          }
        }, 11000);
      }, 5000);
      socket.on('updateAns', answer => {
        gameService.setAnswer(newGame._id, player.id, answer);
      });
    });

    //socket.on(user join)
    //socket.on(user leave)
  });
}

module.exports = {
  setup
};
