import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/homePage';
import addQuiz from './views/addQuiz';
<<<<<<< HEAD
import logIn from './views/logIn';
import signUp from './views/signUp';

=======
import TEST1 from './components/quizLobby.vue';
>>>>>>> 547dcc11d523145a65079efa35e60fe3348f41e7
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
<<<<<<< HEAD
      path: '/login',
      name: 'logIn',
      component: logIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
=======
      path: '/quiz/TESTING',
      name: 'TEST1',
      component: TEST1
    }
>>>>>>> 547dcc11d523145a65079efa35e60fe3348f41e7
  ]
});
