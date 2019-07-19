import socket from '../service/SocketService.js';
import quizStore from './quizStore.js';

export default {
  state: {
    liveGames: [],
    serverClock: null,
    gameState: {
      users: [],
      countdown: 5,
      gameStage: 'quizDetails',
      currentQuiz: null,
      currentQuestion: null,
      scores: [],
      userScores: [],
      user: {}
    }
  },
  mutations: {
    addUser(state, { user }) {
      //TODO: CHECK FOR DELETE
      state.users.push(user);
    },
    updateServerClock(state, { clock }) {
      state.serverClock = clock;
    },
    updateGameCountDown(state, { countdown }) {
      state.gameState.countdown = countdown;
    },
    updateGameStage(state, { stage }) {
      state.gameState.gameStage = stage;
    },
    firstGameSetting(state, { quiz }) {
      state.gameState.currentQuiz = quiz;
    },
    updateCurrentQuestion(state, currentQuestion) {
      state.gameState.currentQuestion = currentQuestion;
    },
    //setting the game scores from server on emit of stages: middle/end
    setGameScore(state, { gameScores }) {
      state.gameState.scores = gameScores;
    },
    setLiveGames(state, { liveGames }) {
      state.liveGames = liveGames;
    },
    setUserScores(state, { res }) {
      console.log('setting the user score MUT', res);
      //TODO: CHECK IF CAN COMMENT IT OUT AND USE THE SCORES FROM SET USER
      state.gameState.userScores.push(res.score);
    },
    setUser(state, { infoToLog }) {
      state.gameState.user = infoToLog;
    }
  },
  actions: {
    setUser(context, { infoToLog }) {
      context.commit({ type: 'setUser', infoToLog });
    },
    logToLiveGame(context, { infoToLog }) {
      socket.emit('loggingToGame', infoToLog);
    },
    setLoadedGames(context, { liveGames }) {
      context.commit({ type: 'setLiveGames', liveGames });
    },
    //getting the game scores from server on emit of stages: middle/end
    getGameScores(context, { gameScores }) {
      console.log('game Scores back from server in action', gameScores);
      context.commit({ type: 'setGameScore', gameScores });
    },
    //updating the user score array (only score) and emiting to server
    updateAns(context, { res }) {
      socket.emit('updateAns', res);
      context.commit({ type: 'setUserScores', res });
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
      socket.on('startTheGame', () => {});
    }
  },
  getters: {
    getUser(state) {
      return state.gameState.user;
    },
    getLiveGames(state) {
      let liveGames = state.liveGames.map(game => {
        game.quiz.gameId = game._id;
        return game.quiz;
      });
      return liveGames;
    },
    users(state) {
      //TODO: CHECK FOR DELETE
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
    //return all users scores and info -
    //TODO: CAN I DELETE?
    // getUsersScores(state) {
    //   return state.gameState.userScores;
    // },
    //getting the game scores from server on emit of stages: middle/end
    getGameScores(state) {
      return state.gameState.scores.gamePlayers;
    }
  }
};
