import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/homePage';
import addQuiz from './views/addQuiz';
import editQuiz from './views/editQuiz';
import quizGame from './views/quizGame.vue';
import quizLibrary from './views/quizLibrary.vue';
import leaderBoard from './views/leaderBoard.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/quiz/add',
      name: 'addQuiz',
      component: addQuiz
    },
    {
      path: '/quiz/edit/:id',
      name: 'editQuiz',
      component: editQuiz
    },
    {
      path: '/quiz/:id/game',
      name: 'quizGame',
      component: quizGame
    },
    {
      path: 'quiz/:id/game/:gameId',
      name: 'quizMultiGame',
      component: quizGame
    },
    {
      path: '/library',
      name: 'quizLibrary',
      component: quizLibrary
    },
    {
      path: '/score',
      name: 'score',
      component: leaderBoard
    }
  ]
});
// {
//   path: 'quiz/:id/game/:gameId',
//   name: 'quizMultiGame',
//   component: quizGame
// },
