import io from 'socket.io-client';
import socketStore from '../stores/socketStore.js';
import store from '../stores/store.js';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000';
const socket = io(BASE_URL);

export default {
  on,
  emit,
  socket
};

function on(trigger, cb) {
  socket.on(trigger, cb);
}

function emit(trigger, data) {
  socket.emit(trigger, data);
}

on('serverTime', clock => {
  store.dispatch({ type: 'serverClock', clock });
});

on('startGameTimer', () => {
  store.dispatch({ type: 'gameStartListener' });
});

on('questionChange', currentQuestion => {
  console.log(currentQuestion);
  store.dispatch({ type: 'changeGameQuestion', currentQuestion });
});
on('loggedUser', loggedPlayer => {
  console.log(loggedPlayer);
  store.dispatch({ type: 'newLoggedUser', loggedPlayer });
});

on('startTheGame', () => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizQuest' });
});
on('middleQuiz', gameScores => {
  console.log('scores in socket Service front', gameScores);
  store.dispatch({ type: 'changeGameStage', stage: 'quizResult' });
  store.dispatch({ type: 'getGameScores', gameScores: gameScores });
});
on('quizQuest', () => {
  console.log('change screen socket service');
  store.dispatch({ type: 'changeGameStage', stage: 'quizQuest' });
});
on('endGame', gameScores => {
  console.log('emit endgame');
  store.dispatch({ type: 'changeGameStage', stage: 'quizEnd' });
  store.dispatch({ type: 'getGameScores', gameScores });
});

on('returnAllLiveGames', liveGames => {
  store.dispatch({ type: 'setLoadedGames', liveGames });
});

// on('changeGameStage', stage => {
//   console.log('change screen socket service');
//   store.dispatch({ type: 'changeGameStage', stage: stage });
// });
