import Vue from 'vue'
import Vuex from 'vuex'

let test = [
  {
    _id: "3d298urffgj",
    title: "comic quiz",
    tags: "Entertainment, Comics",
    createdAt: 1562917080939,
    createdBy: "3298urj",
    bestScore: 57,
    likesCount: 2,
  },
  {
    _id: "3298urffdgj",
    title: "comic quiz",
    tags: "Entertainment, Comics",
    createdAt: 1562917080939,
    createdBy: "3298urj",
    bestScore: 57,
    likesCount: 2,
  },
  {
    _id: "329d8urffgj",
    title: "comic quiz",
    tags: "Entertainment, Comics",
    createdAt: 1562917080939,
    createdBy: "3298urj",
    bestScore: 57,
    likesCount: 2,
  }
]



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizes: test
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getQuizes(state) {
      let quizesToShow = state.quizes;
      return quizesToShow;
    }
  }
})
