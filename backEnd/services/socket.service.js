const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;
function setup(http) {
  io = socketIO(http);
  io.on('connection', function(socket) {
    console.log('a user connected');
    var room;
    activeUsersCount++;

    socket.on('disconnect', () => {
      console.log('user disconnected');
      activeUsersCount--;
    });

    setInterval(() => {
      socket.emit('serverTime', Date.now());
      console.log(Date.now());
    }, 200);

    // socket.on('chat join', (user) => {
    //     room = roomService.placeInRoom(user)
    //     console.log('Placed', user, 'in room:', room);
    //     socket.join(room.id);
    // });

    // socket.on('chat msg', (msg) => {
    //     console.log('message: ' + msg);
    //     io.to(room.id).emit('chat newMsg', msg);
    // });
  });
}

module.exports = {
  setup
};
