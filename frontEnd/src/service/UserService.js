import httpService from './httpService.js';

export default {
  login,
  logout,
  signup,
  getUsers,
  checkUser,
  createGuestUser
};

function checkUser() {
  return httpService.get('user/getLoggedIn');
}

function createGuestUser() {

}

function login(userCred) {
  // console.log('user service:', userCred);
  return httpService.post('auth/login', userCred);
  // return httpService.ajax('api/auth/login', 'post', userCred)
  //     .then(res => console.log('result is:', res))
}
function signup(userCred) {
  // console.log('we got the user signUp');
  httpService.post('auth/signup', userCred).then(res => console.log(res));
  // .ajax('api/auth/signup', 'post', userCred)
}
function logout() {
  // console.log('frontend logout');
  httpService.post('auth/logout').then(res => console.log(res));
}
function getUsers() {
  httpService.ajax('user').then(res => console.log(res));
}
