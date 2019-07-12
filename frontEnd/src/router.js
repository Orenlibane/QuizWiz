import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/Home.vue';
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
    }
  ]
});
