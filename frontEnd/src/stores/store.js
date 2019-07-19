import Vue from 'vue';
import Vuex from 'vuex';
import quizStore from './quizStore.js';
import socketStore from './socketStore.js';
import gameStore from './gameStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    quizStore,
    socketStore,
    gameStore
  },
  state: {
    isGame: false
  },
  mutations: {},
  actions: {},
  getters: {}
});
