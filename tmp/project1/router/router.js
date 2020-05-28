const express = require('express');

var userRouter = require('../router/user.router');
var roomRouter = require('../router/room.router');


module.exports = function(app, keycloak) {

  app.use('/api/user', keycloak.protect(), userRouter);
  app.use('/api/room', keycloak.protect(), roomRouter);

}