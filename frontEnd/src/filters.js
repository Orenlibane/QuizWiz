import Vue from 'vue';
// import moment from 'moment';

Vue.filter('answerFormat', val => {
  if (val === 'false') return '❌';
  else return '✅';
});

Vue.filter('grade', val => {
  if (val <= 0.3) return 'Too bad, u can do better';
  else if (val <= 0.6) return 'i guess thats ok...';
  else if (val <= 0.99) return 'nice!';
  else return 'Perfect!!';
});
