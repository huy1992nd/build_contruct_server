const express = require('express');
var userRouter = require('../router/user.router');

module.exports = function (app, keycloak) {
  app.use('/api/user', keycloak.protect(), userRouter);
}