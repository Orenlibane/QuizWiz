const gameStore = {
  state: {
    currentGameUsers: []
  },
  mutations: {
    addLoggedUser(state, { loggedPlayer }) {
      console.log(loggedPlayer);
      state.currentGameUsers.push(loggedPlayer);
    }
  },
  actions: {
    newLoggedUser(context, { loggedPlayer }) {
      console.log(loggedPlayer);
      context.commit({ type: 'addLoggedUser', loggedPlayer });
    }
  },
  getters: {
    getLoggedUsers(state) {
      return state.currentGameUsers;
    }
  }
};

export default gameStore;
