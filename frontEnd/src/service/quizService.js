import httpService from './httpService';

export default {
  query,
  addQuiz,
  deleteQuiz,
  editQuiz,
  getById
};

// function query() {
//   return httpService.get('/');
//   console.log('haaa');
// }

async function query() {
  try {
    return await httpService.get('/');
  } catch (err) {
    console.log('error in getting List', err);
    throw new error();
  }
}

async function getById(id) {
  try {
    console.log(id);
    return await httpService.get(`/${id}`);
  } catch (err) {
    console.log('error in getting single', err);
    throw new error();
  }
}

async function addQuiz(NewQuiz) {
  try {
    console.log(NewQuiz, 'quiz before http service');
    return await httpService.post(`/`, NewQuiz);
  } catch (err) {
    console.log('error in adding quiz', err);
    throw new error();
  }
}

async function editQuiz(NewQuiz) {
  try {
    return await httpService.put(`/${NewQuiz._id}`, NewQuiz);
  } catch (err) {
    console.log('error in editing quiz', err);
    throw new error();
  }
}

async function deleteQuiz(id) {
  console.log(id, 'delete in quizservice');
  try {
    return await httpService.delete(`/${id}`, id);
  } catch (err) {
    console.log('error in deleting quiz', err);
    throw new error();
  }
}
