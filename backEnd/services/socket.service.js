const socketIO = require('socket.io');
const gameService = require('./game-service');

var io;
function setup(http) {
  io = socketIO(http);
  io.on('connection', function (socket) {
    //SERVER GLOBAL TIME SEND
    setInterval(() => {
      socket.emit('serverTime', Date.now());
    }, 200);

    

  });
}

module.exports = {
  setup
};
