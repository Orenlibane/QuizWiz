import httpService from './httpService';

export default {
  query,
  addQuiz,
  deleteQuiz,
  editQuiz,
  getById,
};

async function query() {
  try {
    return await httpService.get('quiz');
  } catch (err) {
    console.log('error in getting List', err);
    throw new error();
  }
}

async function getById(id) {
  try {
    return await httpService.get(`quiz/${id}`);
  } catch (err) {
    console.log('error in getting single', err);
    throw new error();
  }
}

async function addQuiz(NewQuiz) {
  try {
    return await httpService.post(`quiz/`, NewQuiz);
  } catch (err) {
    console.log('error in adding quiz', err);
    throw new error();
  }
}

async function editQuiz(NewQuiz) {
  try {
    console.log('newquiz in frontend service', NewQuiz);
    return await httpService.put(`quiz/${NewQuiz._id}`, NewQuiz);
  } catch (err) {
    console.log('error in editing quiz', err);
    throw new error();
  }
}

async function deleteQuiz(id) {
  try {
    return await httpService.delete(`quiz/${id}`, id);
  } catch (err) {
    console.log('error in deleting quiz', err);
    throw new error();
  }
}
