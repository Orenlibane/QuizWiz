import HttpService from './HttpService';

export default {
  query,
  addQuiz,
  deleteQuiz,
  updateQuiz
};

function query() {
  HttpService.ajax('/quizes').then(res => console.log(res));
}

function addQuiz(quizInfo) {
  console.log('in add');
  HttpService.ajax(`/quizes/`, 'post', quizInfo).then(res => console.log(res));
}
