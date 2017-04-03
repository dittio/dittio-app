const { Router } = require('express');
const {
  loginUser,
  moveToSecret,
  logoutUser,
} = require('./userCtrl');

const userRoute = module.exports = new Router();

userRoute.post('/login', loginUser, moveToSecret);

userRoute.post('/logout', logoutUser);

userRoute.post('/', (req, res) => {
  console.log('PLACEHOLDER: SIGNUP ROUTE');
});
