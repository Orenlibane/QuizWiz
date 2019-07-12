import Vue from 'vue';
import Vuex from 'vuex';
import quizService from './service/quizService.js';
import userStore from './userStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore
  },

  state: {
    quizes: ''
  },
  mutations: {
    setQuizes(state, { quizes }) {
      state.quizes = quizes;
    }
  },
  actions: {
    loadQuizes(context) {
      return quizService.query().then(quizes => {
        context.commit({ type: 'setQuizes', quizes });
      });
    }
  },
  getters: {
    getQuizes(state) {
      return state.quizes;
    }
  }
});
