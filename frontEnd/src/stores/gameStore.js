const gameStore = {
  state: {
    currentGameUsers: []
  },
  //add new logged user to see in the lobby screen
  mutations: {
    addLoggedUser(state, { loggedPlayer }) {
      state.currentGameUsers.push(loggedPlayer);
    }
  },
  actions: {
    //add new logged user to see in the lobby screen
    //TODO: change name
    newLoggedUser(context, { loggedPlayer }) {
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
