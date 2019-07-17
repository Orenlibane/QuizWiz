import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/homePage';
import addQuiz from './views/addQuiz';
import editQuiz from './views/editQuiz';
import logIn from './views/logIn';
import signUp from './views/signUp';
import quizGame from './views/quizGame.vue';
import quizLibary from './views/quizLibary.vue';
import TEST1 from './components/quizGameScreens/quizLobby.vue';
// import about from './views/about.vue';

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
      path: '/login',
      name: 'logIn',
      component: logIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/quiz/TESTING',
      name: 'TEST1',
      component: TEST1
    },
    {
      path: '/quiz/:id/game',
      name: 'quizGame',
      component: quizGame
    },
    {
      path: '/libary',
      name: 'quizLibary',
      component: quizLibary
    }
  ]
});
