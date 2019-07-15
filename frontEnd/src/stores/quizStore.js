'use strict';
import quizService from '@/service/quizService.js';
import utilService from '@/service/utilService.js';
const quizStore = {
  state: {
    quizes: ''
  },
  mutations: {
    setQuizes(state, { quizes }) {
      state.quizes = quizes;
    },
    addQuiz(state, { addedQuiz }) {
      console.log(addedQuiz, 'this is the new added quiz');
      state.quizes.unshift(addedQuiz);
    },
    deleteQuiz(state, { quizId }) {
      var idxToDelete = state.quizes.findIndex(quiz => quiz._id === quizId);
      state.quizes.splice(idxToDelete, 1);
    },
    editQuiz(state, { loadedQuiz }) {
      let idxToChange = state.quizes.findIndex(
        quiz => quiz._id === loadedQuiz._id
      );
      state.quizes.splice(idxToChange, 1, loadedQuiz);
    }
  },
  getters: {
    getQuizes(state) {
      return state.quizes;
    }
  },

  actions: {
    async getQuiz(context, { quizId }) {
      console.log(quizId);
      return await quizService.getById(quizId);
    },
    async loadQuizes(context) {
      const quizes = await quizService.query();
      context.commit({ type: 'setQuizes', quizes });
    },
    async deleteQuiz(context, { quizId }) {
      console.log(quizId, 'delete in store action');
      try {
        await quizService.deleteQuiz(quizId);
        context.commit({ type: 'deleteQuiz', quizId });
      } catch (err) {
        console.log('err in deleting in store', err);
      }
    },
    async addQuiz(context, { addedQuiz }) {
      try {
        addedQuiz.createdAt = Date.now();
        addedQuiz = await quizService.addQuiz(addedQuiz);
        console.log('pushed', addedQuiz);
        context.commit({ type: 'addQuiz', addedQuiz });
      } catch (err) {
        console.log('err in adding in store', err);
      }
    },
    async editQuiz(context, { loadedQuiz }) {
      try {
        await quizService.editQuiz(loadedQuiz);
        context.commit({ type: 'editQuiz', loadedQuiz });
      } catch (err) {
        console.log('err in editing in store', err);
      }
    }
  }
};

export default quizStore;
