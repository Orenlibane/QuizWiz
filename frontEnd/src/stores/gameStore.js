Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {},
  state: {
    userRes: [],
    currQuestTimer: null,
    currQuest: null,
  },
  mutations: {},
  getters: {},
  actions: {
    async getCurrQuestTimer(context) {
      try{
        console.log('getting time');
      }
      catch {
        console.log('could not get time');
      }
    }
  },
});

// async getQuiz(context, { quizId }) {
//   return await quizService.getById(quizId);
// },