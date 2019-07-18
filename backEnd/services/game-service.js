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
  return onlineGames; //which are isOn:false
}
function gamePlayersCount(gameId) {
  const gameById = onlineGames.find(game => game._id === gameId);
  console.log('is bug here?');
  return gameById.gamePlayers.length;
}
// Michael: Need to keep going with the code check from here
//In here - later on we'll have to get the guest nickname and its id from the session.
function joinGame(
  gameId,
  player = { nickName: 'guest', id: _makeId(), ans: [] }
) {
  const gameById = onlineGames.find(game => game._id === gameId);
  gameById.gamePlayers.push(player);
  return player;
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
  console.log(gameId);
  onlineGames = onlineGames.filter(game => game._id !== gameId);
  console.log('games after', onlineGames);
}

// Setthe curr ans for each one of the players array
function setAnswer(gameId, playerId, answer) {
  const currGame = onlineGames.find(game => game._id === gameId);
  const currPlayer = currGame.gamePlayers.find(
    player => player.id === playerId
  );
  if (!currPlayer.ans) currPlayer.ans = [];
  currPlayer.ans.push(answer);
}

function getGameById(gameId) {
  return onlineGames.find(game => game._id === gameId);
}

function createGame(quiz) {
  const newGame = {
    gamePlayers: [],
    isGameOn: false,
    quiz,
    status: 'lobby',
    currQuest: 0,
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
