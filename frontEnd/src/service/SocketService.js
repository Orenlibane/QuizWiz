import io from 'socket.io-client';
const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000';
const socket = io(BASE_URL);

export default {
  on,
  emit
};

function on(trigger, cb) {
  socket.on(trigger, cb);
}

function emit(trigger, data) {
  socket.emit(trigger, data);
}
