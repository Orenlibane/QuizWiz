const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);
  io.on('connection', function(socket) {
    //SERVER GLOBAL TIME SEND
    setInterval(() => {
      socket.emit('serverTime', Date.now());
    }, 200);

    socket.on('onCreateGame', function(quiz) {
      const newGame = gameService.createGame(quiz);
      //Create and join the room
      socket.join(newGame._id);
      //join the game creator into game on the service
      gameService.joinGame(newGame._id);
      //for debugging - checking the current games
      const allGames = gameService.getAllonlineGames();
      // console.log(allGames);
      socket.emit('startGameTimer')
      console.log("sdfdssdfdsfds")
      //count to 30
      setTimeout(() => {
        socket.emit('startTheGame');
        console.log('sent the start game from server');
      }, 10000);
    });

    //socket.on(user join)
    //socket.on(user leave)
  });
}

module.exports = {
  setup
};
