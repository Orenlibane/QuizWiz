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
  return HttpService.ajax('/id').then(res => console.log(res));
}

function addQuiz(NewQuiz) {
  return HttpService.ajax(`/`, 'post', NewQuiz).then(res => console.log(res));
}

function updateQuiz(NewQuiz) {
  return HttpService.ajax(`/id`, 'put', NewQuiz).then(res => console.log(res));
}

function deleteQuiz(id) {
  return HttpService.ajax(`/${id}`, 'delete', id).then(res => res);
}
