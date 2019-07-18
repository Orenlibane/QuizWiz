import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/homePage';
import addQuiz from './views/addQuiz';
import editQuiz from './views/editQuiz';
import signUp from './views/signUp';
import quizGame from './views/quizGame.vue';
import quizLibrary from './views/quizLibrary.vue';
import userProfile from './views/userProfile.vue';
import welcomePage from './views/welcomePage.vue';
import TEST1 from './components/quizGameScreens/quizQuest.vue';
// import about from './views/about.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: welcomePage
    },
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
    // {
    //   path: '/login',
    //   name: 'logIn',
    //   component: logIn
    // },
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
      path: '/library',
      name: 'quizLibary',
      component: quizLibrary
    }
  ]
});
