import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './userStore.js';
import quizStore from './quizStore.js';
import socketStore from './socketStore.js';
import gameStore from './gameStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore,
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
