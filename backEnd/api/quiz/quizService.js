const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  query,
  remove,
  getById,
  add,
  update,
  likeQuiz
};

async function query() {
  const collection = await dbService.getCollection('quiz');
  try {
    const quiz = await collection.find({}).toArray();
    return quiz;
  } catch (err) {
    console.log('ERROR: cannot find quiz');
    throw new error();
  }
}

async function getById(quizId) {
  const collection = await dbService.getCollection('quiz');
  try {
    const quiz = await collection.findOne({ _id: ObjectId(quizId) });
    return quiz;
  } catch (err) {
    console.log('error, cannot find quiz', quizId);
  }
}

async function remove(quizId) {
  const collection = await dbService.getCollection('quiz');
  try {
    await collection.remove({ _id: ObjectId(quizId) });
  } catch (err) {
    console.log(`ERROR: cannot remove quiz ${quizId}`);
    throw err;
  }
}

async function add(quiz) {
  const collection = await dbService.getCollection('quiz');
  try {
    await collection.insertOne(quiz);
    return quiz;
  } catch (err) {
    console.log(`ERROR: cannot insert quiz`);
    throw err;
  }
}

async function update(quiz) {
  const collection = await dbService.getCollection('quiz');
  try {
    const quizId = quiz._id;
    delete quiz._id;
    await collection.updateOne({ _id: ObjectId(quizId) }, { $set: quiz });
    return quiz;
  } catch (err) {
    console.log(`ERROR: cannot update quiz ${quiz._id}`);
    throw err;
  }
}

async function likeQuiz(quizId) {
 await console.log('QUIZ');
}
