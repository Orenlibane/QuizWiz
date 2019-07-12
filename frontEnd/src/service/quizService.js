import HttpService from './HttpService';

export default {
  query,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  getById
};

function query() {
  return HttpService.ajax('/').then(res => res);
}

function getById(id) {
  HttpService.ajax('/id').then(res => console.log(res));
}

function addQuiz(NewQuiz) {
  HttpService.ajax(`/`, 'post', NewQuiz).then(res => console.log(res));
}

function updateQuiz(NewQuiz) {
  HttpService.ajax(`/`, 'put', NewQuiz).then(res => console.log(res));
}

function deleteQuiz(id) {
  HttpService.ajax(`/`, 'delete', quizInfo).then(res => console.log(res));
}
