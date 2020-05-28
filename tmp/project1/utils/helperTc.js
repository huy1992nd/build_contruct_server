const jwt = require('jsonwebtoken');
const config = require('../config/main');
const validator = require('validator');
// Set user info from request
exports.setUserInfoSystem = function setUserInfoSystem(userSystem) {
  const getUserInfo = {
    id: userSystem.id,
    email: userSystem.email,
    mobile: userSystem.mobile,
    name: userSystem.name,
  };
  return getUserInfo;
};

exports.setUserInfoFacebook = function setUserInfoFacebook(userFacebook) {
  const getUserInfo = {
    id: userFacebook.id,
    facebookId: userFacebook.facebookId,
    facebookName: userFacebook.facebookName,
    facebookEmail: userFacebook.facebookEmail,
  };
  return getUserInfo;
};

exports.setUserInfoGoogle = function setUserInfoGoogle(userGoogle) {
  const getUserInfo = {
    id: userGoogle.id,
    googleId: userGoogle.googleId,
    googleName: userGoogle.googleName,
    googleEmail: userGoogle.googleEmail,
  };
  return getUserInfo;
};

exports.generateToken = function generateToken(user) {
  return jwt.sign(user, config.SECRET, {
    expiresIn: 60 * 60 * 24 * 10 // expiry 10 day.
  });
}
//format fone number of malaysia
exports.checkPatternMobile = function (mobile) {
  var pattern = /^(011|015)-[0-9]{4} [0-9]{4}$/;
  var pattern1 = /^((?!011)(?!015)[0-9]{3})-[0-9]{3} [0-9]{4}$/;
  var pattern2 = /^\+60\-(11|15)-[0-9]{4} [0-9]{4}$/;
  var pattern3 = /^\+60\-[0-9]{2}-[0-9]{3} [0-9]{4}$/;

  //var mobile = '011-1111 1111';
  // var pattern1 = /^((011|015)-\d{4} \d{4}|\d{3}-\d{3} \d{4})$/;
  // var pattern2 = /^(\+60\-(11|15)-\d{4} \d{4}|\+60\-\d{2}-\d{3} \d{4})$/;

  if (pattern.test(mobile) || pattern1.test(mobile) || pattern2.test(mobile) || pattern3.test(mobile)) {
    return true;
  }
  else {
    return false;
  }
}

exports.getNumberMobile = function(mobile){
  return mobile.replace(/[^0-9]/g, '');
}

exports.checkPassword = function (str) {
  // var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/;
  return re.test(str);
}
exports.getEmailValidFromUser = function (user) {
  if (validator.isEmail(user.email.toString()))
    return user.email.toString();
  if (validator.isEmail(user.userEmail.toString()))
    return user.userEmail.toString();
  if (validator.isEmail(user.facebookEmail.toString()))
    return user.facebookEmail.toString();
  if (validator.isEmail(user.googleEmail.toString()))
    return user.googleEmail.toString();
}