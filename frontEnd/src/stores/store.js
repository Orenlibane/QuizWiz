import Vue from 'vue';
import Vuex from 'vuex';
import quizService from '@/service/quizService.js';
import userStore from './userStore.js';
import quizStore from './quizStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore
  },

  state: {
    quizes: '',
    isGame: false
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
    async getQuiz(context, { quizId }) {
      return await quizService.getById(quizId);
    },
    async loadQuizes(context) {
      const quizes = await quizService.query();
      context.commit({ type: 'setQuizes', quizes });
    },
    async deleteQuiz(context, { quizId }) {
      try {
        await quizService.deleteQuiz(quizId);
        context.commit({ type: 'deleteQuiz', quizId });
      } catch (err) {
        console.log('err in deleting in store', err);
      }
    },
    async editQuiz(context, { loadedQuiz }) {
      try {
        context.commit({ type: 'editQuiz', loadedQuiz });
        quizService.editQuiz(loadedQuiz);
      } catch (err) {
        console.log('err in editing in store', err);
      }
    }
  },
  getters: {
    getQuizes(state) {
      return state.quizes;
    }
  }
});
