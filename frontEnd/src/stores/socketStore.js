import socket from '../service/SocketService.js';

export default {
  state: {
    liveGames: [],
    gameOn: false,
    serverClock: null,
    gameState: {
      users: [],
      gameStage: 'quizDetails',
      currentQuiz: null,
      currentQuestion: null,
      scores: [],
      userScores: [],
      user: {},
      lobbyTimer: null
    }
  },
  mutations: {
    updateGameOn(state, { status }) {
      state.gameOn = status;
    },
    updateServerClock(state, { clock }) {
      state.serverClock = clock;
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
      state.gameState.userScores.push(res.score);
    },
    setUser(state, { infoToLog }) {
      state.gameState.user = infoToLog;
    },
    updateLobbyTimer(state, { lobbyTimer }) {
      state.gameState.lobbyTimer = lobbyTimer;
    }
  },
  actions: {
    setGameStatus(context, { status }) {
      context.commit({ type: 'updateGameOn', status });
    },
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
    startGame(context) {
      socket.on('startTheGame', () => {});
    },
    updateLobbyTimer(context, { lobbyTimer }) {
      context.commit({ type: 'updateLobbyTimer', lobbyTimer });
    }
  },
  getters: {
    getGameStatus(state) {
      return state.gameOn;
    },
    getUser(state) {
      return state.gameState.user;
    },
    getLiveGames(state) {
      let liveGames = state.liveGames.map(game => {
        game.quiz.gameId = game._id;
        game.quiz.isGameOn = game.isGameOn;
        return game.quiz;
      });
      return liveGames;
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
    //getting the game scores from server on emit of stages: middle/end
    getGameScores(state) {
      return state.gameState.scores.gamePlayers;
    },
    getLobbyTimer(state) {
      return state.gameState.lobbyTimer;
    }
  }
};
