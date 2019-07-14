import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './userStore.js';
import quizStore from './quizStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore,
    quizStore
  },

  state: {
    isGame: false

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
});
