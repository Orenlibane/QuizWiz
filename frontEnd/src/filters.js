import Vue from 'vue';
import moment from 'moment';

Vue.filter('answerFormat', val => {
  if (val === 'false') return '❌';
  else return '✅';
});

Vue.filter('grade', val => {
  if (val <= 15) return '🐺You know Nothing Jon Snow🐺 ';
  else if (val <= 30) return "😥Too bad, I'm sure you can do better😥";
  else if (val <= 60) return 'I guess thats ok...';
  else if (val <= 85) return 'Very Nice!';
  else if (val <= 95) return 'You are Amazing🏆';
  else return 'Perfect!!! You deserve a cookie 🍪';
});

Vue.filter('timeAgo', ms => {
  return moment(ms).fromNow();
});
