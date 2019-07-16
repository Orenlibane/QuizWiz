import socket from '../service/SocketService.js';
import { clearInterval } from 'timers';

export default {
  state: {
    users: [],
    serverClock: null,
    gameTime: 30,
    timeInterval: null
  },
  getters: {
    users(state) {
      return state.users;
    },
    serverTime(state) {
      return state.serverClock;
    },
    getTime(state) {
      return state.gameTime;
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
    },
    onCreateGame(context, { quiz }) {
      console.log(quiz, 'store - on create game');
      socket.emit('onCreateGame', quiz);
    },
    startGameTimer(context) {
      socket.on('startGameTimer', () => {
        this.state.timeInterval = setInterval(() => {
          this.state.gameTime--;
        }, 1000);
        setTimeout(() => {
          clearInterval(this.state.timeInterval);
          this.state.gameTime = 30;
        }, 30000);
      });
    },
    startGame(context) {
      socket.on('startTheGame');
      console.log('listening to start game from front');
    }
  }
};
