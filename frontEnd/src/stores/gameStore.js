const gameStore = {
  state: {
    currentGameUsers: []
  },
  //add new logged user to see in the lobby screen
  mutations: {
    setGamePlayers(state, { gamePlayers }) {
      state.currentGameUsers = gamePlayers;
    }
  },
  actions: {
    setLoggedGamePlayers(context, { gamePlayers }) {
      context.commit({ type: 'setGamePlayers', gamePlayers });
    }
  },
  getters: {
    getLoggedUsers(state) {
      return state.currentGameUsers;
    }
  }
};

export default gameStore;
