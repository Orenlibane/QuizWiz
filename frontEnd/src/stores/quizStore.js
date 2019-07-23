'use strict';
import quizService from '@/service/quizService.js';

const quizStore = {
  state: {
    quizes: [],
    filterBy: {
      txt: ''
    }
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy.txt = filterBy.txt.toLowerCase();
    },
    setQuizes(state, { quizes }) {
      state.quizes = quizes;
    },
    addQuiz(state, { addedQuiz }) {
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
      console.log('getter of quizes returns:', state.quizes);
      return state.quizes;
    },
    getFilterQuizes(state) {
      return state.quizes.filter(quiz =>
        quiz.name.toLowerCase().includes(state.filterBy.txt)
      );
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
    async addQuiz(context, { addedQuiz }) {
      try {
        addedQuiz.createdAt = Date.now();
        addedQuiz = await quizService.addQuiz(addedQuiz);
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
    },
    setFilter(context, { filterBy }) {
      context.commit({ type: 'setFilter', filterBy });
    }
  }
};

export default quizStore;
