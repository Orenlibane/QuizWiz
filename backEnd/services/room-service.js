// This is a room service that allows up to 2 people in a room

module.exports = {
  getAllActiveGameRooms,
  createGame,
  joinGame,
  leaveGame,
  destroyGame,
  checkGameMembers
};

let liveGames = [];

function makeId(size = 5) {
  let txt = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < size; i++) {
    txt += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return txt;
}

function getAllActiveGameRooms() {
  return liveGames;
}

function createGame(member = { _id: makeId(), name: 'guest' }, quiz) {
  const game = {
    members: [member],
    quiz: quiz,
    isGameOn: false
  };
  game._id = makeId(12);
  liveGames.push(newRoom);
  return game;
}
function joinGame(member, gameId) {
  const gameIdx = liveGames.findIndex(game => game._id === gameId);
  liveGames[gameIdx].members.push(member);
}

function leaveGame(leavingMember, gameId) {
  const gameIdx = liveGames.findIndex(game => game._id === gameId);
  const memberIdx = liveGames[gameIdx].members.findIndex(
    member => member._id === leavingMember._id
  );
  liveGames[gameIdx].members.splice(memberIdx, 1);
}

function checkGameMembers(gameId) {
  return game.members.length;
}
function destroyGame(gameId) {
  const gameIdx = liveGames.findIndex(game => game._id === gameRoomId);
  liveGames.splice(gameIdx, 1);
}

function placeInRoom(member) {
  var room = findRoomWith(member);
  if (room) return room;
  room = findAvailableRoom();
  if (room) {
    room.members.push(member);
    return room;
  }
  return createRoom(member);
}

const gRooms = [];
// a room object:
// {
//     roomId,
//     members : []
// }
function findRoomWith(member) {
  return gRooms.find(room =>
    room.members.find(currMember => currMember === member)
  );
}

function findAvailableRoom() {
  return gRooms.find(({ members }) => members.length === 1);
}

function createRoom(member) {
  var newRoom = {
    members: [member],
    id: makeId()
  };
  gRooms.push(newRoom);
  return newRoom;
}
