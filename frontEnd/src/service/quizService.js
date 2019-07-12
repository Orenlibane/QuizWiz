import HttpService from './HttpService';

export default {
  query,
  addQuiz,
  deleteQuiz,
  editQuiz,
  getById
};

function query() {
  return HttpService.ajax('/').then(res => res);
}

function getById(id) {
  return HttpService.ajax(`/${id}`).then(res => res);
}

function addQuiz(NewQuiz) {
  return HttpService.ajax(`/`, 'post', NewQuiz).then(res => console.log(res));
}

function editQuiz(NewQuiz) {
  return HttpService.ajax(`/${NewQuiz._id}`, 'put', NewQuiz).then(res => res);
}

function deleteQuiz(id) {
  return HttpService.ajax(`/${id}`, 'delete', id).then(res => res);
}
