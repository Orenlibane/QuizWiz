module.exports = {
  createGame,
  joinGame,
  leaveGame,
  removeGame,
  getAllonlineGames,
  startGame,
  gamePlayersCount,
  setAnswer,
  getGameById
};

let onlineGames = [];

function getAllonlineGames() {
  return onlineGames;
}
function gamePlayersCount(gameId) {
  const gameById = onlineGames.find(game => game._id === gameId);
  return gameById.gamePlayers.length;
}
// Michael: Need to keep going with the code check from here
//In here - later on we'll have to get the guest nickname and its id from the session.
function joinGame(gameId, player = { nickName: 'guest', id: _makeId(), ans: [] }) {
  const gameById = onlineGames.find(game => game._id === gameId);
  gameById.gamePlayers.push(player);
  return player.id;
}
function leaveGame(playerId, gameId) {
  const gameById = onlineGames.find(game => game._id === gameId);
  gameById = gameById.gamePlayers.filter(player => player._id !== playerId);
}
function startGame(gameId) {
  const gameById = onlineGames.find(game => game._id === gameId);
  gameById.isGameOn = true;
}

function removeGame(gameId) {
  onlineGames = onlineGames.filter(game => game._id !== gameId);
}

function setAnswer(gameId, playerId, answer) {
  console.log('data set answer func gets:', gameId, playerId, answer);
  const currGame = onlineGames.find(game => game._id === gameId);
  console.log(' curr game we got from searching:', currGame);
  const currPlayer = currGame.gamePlayers.find(
    player => player.id === playerId
  );
  console.log('currPlayer', currPlayer);
  if (!currPlayer.ans) currPlayer.ans = [];
  currPlayer.ans.push(answer);
  console.log('curr player ans array is now:', currPlayer.ans);
}

function getGameById(gameId) {
  onlineGames.find(game => game._id === gameId);
}

function createGame(quiz) {
  const newGame = {
    gamePlayers: [],
    isGameOn: false,
    quiz,
    _id: _makeId(12),
    timeCreated: Date.now()
  };
  onlineGames.unshift(newGame);
  return newGame;
}

function _makeId(length = 5) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
