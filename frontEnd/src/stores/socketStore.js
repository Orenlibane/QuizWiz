import socket from '../service/socketService.js';

export default {
  state: {
    liveGames: [],
    gameOn: false,
    gameState: {
      currentGameUsers: [],
      gameStage: 'quizDetails',
      currentQuestion: null,
      scores: [],
      userScores: [],
      user: {},
      lobbyTimer: null
    }
  },
  mutations: {
    setLiveGames(state, { liveGames }) {
      state.liveGames = liveGames;
    },
    setGamePlayers(state, { gamePlayers }) {
      state.gameState.currentGameUsers = gamePlayers;
    },
    updateGameOn(state, { status }) {
      state.gameOn = status;
    },
    updateGameStage(state, { stage }) {
      state.gameState.gameStage = stage;
    },
    updateCurrentQuestion(state, currentQuestion) {
      state.gameState.currentQuestion = currentQuestion;
    },
    //setting the game scores from server on emit of stages: middle/end
    setGameScore(state, { gameScores }) {
      state.gameState.scores = gameScores;
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
    setLoadedGames(context, { liveGames }) {
      context.commit({ type: 'setLiveGames', liveGames });
    },
    setLoggedGamePlayers(context, { gamePlayers }) {
      context.commit({ type: 'setGamePlayers', gamePlayers });
    },
    setGameStatus(context, { status }) {
      context.commit({ type: 'updateGameOn', status });
    },
    setUser(context, { infoToLog }) {
      context.commit({ type: 'setUser', infoToLog });
    },
    //getting the game scores from server on emit of stages: middle/end
    setGameScores(context, { gameScores }) {
      context.commit({ type: 'setGameScore', gameScores });
    },
    changeGameStage(context, { stage }) {
      context.commit({ type: 'updateGameStage', stage: stage });
    },
    changeGameQuestion(context, { currentQuestion }) {
      context.commit({ type: 'updateCurrentQuestion', currentQuestion });
    },
    //Sockets - emits
    logToLiveGame(context, { infoToLog }) {
      socket.emit('loggingToGame', infoToLog);
    },
    updateAns(context, { res }) {
      socket.emit('updateAns', res);
      context.commit({ type: 'setUserScores', res });
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
    getLiveGames(state) {
      let liveGames = state.liveGames.map(game => {
        game.quiz.gameId = game._id;
        game.quiz.isGameOn = game.isGameOn;
        return game.quiz;
      });
      return liveGames;
    },
    getLoggedUsers(state) {
      return state.gameState.currentGameUsers;
    },
    getGameStatus(state) {
      return state.gameOn;
    },
    getUser(state) {
      return state.gameState.user;
    },
    gameStage(state) {
      return state.gameState.gameStage;
    },
    currentQuestion(state) {
      return state.gameState.currentQuestion;
    },
    getGameScores(state) {
      return state.gameState.scores.gamePlayers;
    },
    getLobbyTimer(state) {
      return state.gameState.lobbyTimer;
    }
  }
};
