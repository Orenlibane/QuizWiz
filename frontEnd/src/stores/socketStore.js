import socket from '../service/SocketService.js';
export default {
  state: {
    serverClock: null,
    gameState: {
      users: [],
      countdown: 10,
      timeInterval: null
    },
  },
  mutations: {
    addUser(state, { user }) {
      state.users.push(user);
    },
    updateServerClock(state, { serverClock }) {
      state.serverClock = serverClock;
    },
    updateGameCountDown(state, { countdown }) {
      state.gameState.countdown = countdown;
      console.log(state.gameState.countdown, "from mutation countdown");

    },
    resetGameInterval(state) {
      clearInterval(state.gameState.timeInterval);
      console.log(state.gameState.timeInterval, "from mutation clear");

    }
  },
  actions: {
    serverClock({ commit }) {
      socket.on('serverTime', serverClock =>
        commit({ type: 'updateServerClock', serverClock })
      );
    },
    onCreateGame(context, { quiz }) {
      console.log(quiz, 'store - on create game');
      socket.emit('onCreateGame', quiz);
    },
    gameStartListener(context) {
      socket.on('startGameTimer', () => {
        const interval = setInterval(() => {
          const countdown = context.state.gameState.countdown - 1;
          context.commit({ type: 'updateGameCountDown', countdown })
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          context.commit({ type: 'updateGameCountDown', countdown: 10 })
        }, 10000);
      });
    },

     startGame(context) {
      socket.on('startTheGame');
      console.log('listening to start game from front');
    }
  },
  getters: {
    users(state) {
      return state.users;
    },
    serverTime(state) {
      return state.serverClock;
    },
    getGameCountDown(state) {
      return state.gameState.countdown;
    },
  }
};
