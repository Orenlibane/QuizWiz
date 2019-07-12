import Vue from 'vue';
import Vuex from 'vuex';
import quizService from '@/service/quizService.js';
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
    },
    deleteQuiz(state, { quizId }) {
      var idxToDelete = state.quizes.findIndex(quiz => quiz._id === quizId);
      state.quizes.splice(idxToDelete, 1);
    },
    editQuiz(state, { loadedQuiz }) {
      var idxToChange = state.quizes.findIndex(
        quiz => quiz._id === loadedQuiz._id
      );
      state.quizes.splice(idxToChange, 1, loadedQuiz);
    }
  },
  actions: {
    getQuiz(context, { quizId }) {
      return quizService.getById(quizId).then(quiz => quiz);
    },
    loadQuizes(context) {
      return quizService.query().then(quizes => {
        context.commit({ type: 'setQuizes', quizes });
      });
    },
    deleteQuiz(context, { quizId }) {
      context.commit({ type: 'deleteQuiz', quizId });
    },
    editQuiz(context, { loadedQuiz }) {
      context.commit({ type: 'editQuiz', loadedQuiz });
    }
  },
  getters: {
    getQuizes(state) {
      return state.quizes;
    }
  }
});
