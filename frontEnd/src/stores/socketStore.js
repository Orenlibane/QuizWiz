import socket from '../service/SocketService.js';

export default {
  state: {
    users: [],
    serverClock: null
  },
  getters: {
    users(state) {
      return state.users;
    },
    serverTime(state) {
      return state.serverClock;
    }
  },
  mutations: {
    addUser(state, { user }) {
      state.users.push(user);
    },
    updateServerClock(state, { serverClock }) {
      state.serverClock = serverClock;
    }
  },
  actions: {
    chatJoin({ commit }) {
      socket.emit('chat join', 'Y');
      //   socket.on('chat newMsg', msg => commit({ type: 'addMsg', msg }));
    },
    serverClock({ commit }) {
      socket.on('serverTime', serverClock =>
        commit({ type: 'updateServerClock', serverClock })
      );
    }
    // sendMsg(context, { txt }) {
    //   socket.emit('chat msg', txt);
    // }
  }
};
