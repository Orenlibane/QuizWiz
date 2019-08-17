import Vue from 'vue';
import Vuex from 'vuex';
import quizStore from './quizStore.js';
import socketStore from './socketStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    quizStore,
    socketStore
  },
  state: {
    isGame: false
  },
  mutations: {},
  actions: {},
  getters: {}
});
