import io from 'socket.io-client';
import socketStore from '../stores/socketStore.js';
import store from '../stores/store.js';
import router from '../router.js';

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

on('questionChange', currentQuestion => {
  store.dispatch({ type: 'changeGameQuestion', currentQuestion });
});
on('loggedUser', loggedPlayer => {
  store.dispatch({ type: 'newLoggedUser', loggedPlayer });
});

on('startTheGame', () => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizQuest' });
});
on('middleQuiz', gameScores => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizResult' });
  store.dispatch({ type: 'getGameScores', gameScores: gameScores });
});
on('quizQuest', () => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizQuest' });
});
on('endGame', gameScores => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizEnd' });
  store.dispatch({ type: 'getGameScores', gameScores });
});
on('backToStart', () => {
  store.dispatch({ type: 'changeGameStage', stage: 'quizDetails' });
});

on('returnAllLiveGames', liveGames => {
  store.dispatch({ type: 'setLoadedGames', liveGames });
});

on('sendLobbyTimer', lobbyTimer => {
  store.dispatch({ type: 'updateLobbyTimer', lobbyTimer });
});
