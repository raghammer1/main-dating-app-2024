const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const postTwilio = require('./postTwilio');
const verifyOtp = require('./verifyOtp');

exports.controllers = {
  postLogin,
  postRegister,
  postTwilio,
  verifyOtp,
};
