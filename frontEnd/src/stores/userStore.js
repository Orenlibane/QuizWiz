'use strict';
import userService from '../service/userService.js';
const userStore = {
  state: {
    user: null
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user;
    }
  },
  getters: {
    // getUser(state) {
    //   // console.log('got to getter, returning', state.user);
    //   return state.user;
    // }
  },
  actions: {
    async checkUser(context) {
      try {
        const user = await userService.checkUser();
        // console.log('user we got back from check user:', user);
        if (user) {
          context.commit({ type: 'setUser', user });
          return true;
        }
        return false;
      } catch {
        console.log('Something went wrong in checkUser action');
      }
    },

    async login(context, { userCred }) {
      const user = await userService.login(userCred);
      if (user) context.commit({ type: 'setUser', user });
    },

    signup(context, { userCred }) {
      userService.signup(userCred);
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: 'setUser' });
    },
    getUsers(context) {
      userService.getUsers();
    }
  }
};

export default userStore;
