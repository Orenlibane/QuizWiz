import httpService from './httpService.js';

export default {
  login,
  logout,
  signup,
  getUsers
};

function login(userCred) {
  console.log('we got:', userCred);
  // return httpService.ajax('api/auth/login', 'post', userCred)
  //     .then(res => console.log('result is:', res))
}
function signup(userCred) {
  httpService
    .ajax('api/auth/signup', 'post', userCred)
    .then(res => console.log(res));
}
function logout() {
  httpService.ajax('api/auth/logout', 'post').then(res => console.log(res));
}
function getUsers() {
  httpService.ajax('api/user').then(res => console.log(res));
}
