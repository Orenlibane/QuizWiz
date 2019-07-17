import socket from '../service/SocketService.js';
import quizStore from './quizStore.js';

export default {
  state: {
    serverClock: null,
    gameState: {
      users: [],
      countdown: 5,
      timeInterval: null,
      gameStage: 'quizDetails',
      currentQuiz: null,
      currentQuestion: null,
      scores: [],
      userScore: []
    }
  },
  mutations: {
    addUser(state, { user }) {
      state.users.push(user);
    },
    updateServerClock(state, { clock }) {
      state.serverClock = clock;
    },
    updateGameCountDown(state, { countdown }) {
      state.gameState.countdown = countdown;
      console.log(state.gameState.countdown, 'from mutation countdown');
    },
    resetGameInterval(state) {
      clearInterval(state.gameState.timeInterval);
      console.log(state.gameState.timeInterval, 'from mutation clear');
    },
    updateGameStage(state, { stage }) {
      state.gameState.gameStage = stage;
    },
    firstGameSetting(state, { quiz }) {
      state.gameState.currentQuiz = quiz;
    },
    updateCurrentQuestion(state, { currentQuestion }) {
      console.log(currentQuestion);
      state.gameState.currentQuestion = currentQuestion;
    },
    setGameScore(state, { gameScores }) {
      console.log(gameScores);
      state.gameState.scores = gameScores;
    },
    setUserScore(state, { res }) {
      console.log(res);
      state.gameState.userScore.push(res.score);
    }
  },
  actions: {
    getGameScores(context, { gameScores }) {
      context.commit({ type: 'setGameScore', gameScores });
    },
    updateAns(context, { res }) {
      socket.emit('updateAns', res);
      context.commit({ type: 'setUserScore', res });
    },
    loadGameQuiz(context, { quiz }) {
      context.commit({ type: 'firstGameSetting', quiz });
    },
    changeGameStage(context, { stage }) {
      context.commit({ type: 'updateGameStage', stage: stage });
    },
    changeGameQuestion(context, { currentQuestion }) {
      context.commit({ type: 'updateCurrentQuestion', currentQuestion });
    },
    serverClock(context, { clock }) {
      context.commit({ type: 'updateServerClock', clock });
    },
    onCreateGame(context, { quiz }) {
      socket.emit('onCreateGame', quiz);
    },
    gameStartListener(context) {
      const interval = setInterval(() => {
        const countdown = context.state.gameState.countdown - 1;
        context.commit({ type: 'updateGameCountDown', countdown });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        context.commit({ type: 'updateGameCountDown', countdown: 5 });
      }, 5000);
    },
    startGame(context) {
      socket.on('startTheGame', () => {
        console.log('game start');
      });
    }
  },
  getters: {
    users(state) {
      return state.users;
    },
    serverTime(state) {
      return state.serverClock;
    },
    getGameCountDown(state) {
      return state.gameState.countdown;
    },
    gameStage(state) {
      return state.gameState.gameStage;
    },
    currentQuestion(state) {
      return state.gameState.currentQuestion;
    },
    getQuiz(state) {
      return state.gameState.currentQuiz;
    },
    getGameScores(state) {
      return state.gameState.scores.gamePlayers;
    },
    userTotalScore(state) {
      let totalScore = state.gameState.userScore.reduce((acc, score) => {
        acc += score;
        return acc;
      }, 0);
      return totalScore;
    }
  }
};
