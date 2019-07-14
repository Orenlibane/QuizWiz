import Vue from 'vue';
// import moment from 'moment';

Vue.filter('answerFormat', val => {
  if (val === 'false') return '❌';
  else return '✅';
});

Vue.filter('grade', val => {
  if (val <= 30) return 'Too bad, u can do better';
  else if (val <= 60) return 'I guess thats ok...';
  else if (val <= 85) return 'Very Nice!';
  else return 'Perfect!!';
});
