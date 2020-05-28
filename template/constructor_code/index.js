const Keycloak = require('keycloak-connect');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
let env = process.env.NODE_ENV;
env = 'dev';
const config = require('./config/' + env +"/main");

require("./models/index");
const log = require('./utils/logger');
const messagesList = require('./utils/messages');
const response = require('./utils/response');
const httpStatus = require('./utils/httpStatus');
const router = require('./router/router');
let server = null;
var session = require('express-session');

// start keycloak config
var memoryStore = new session.MemoryStore();
app.use(session({ secret: config.KEY_CLOAK.CLIENT_SECRET, resave: false, saveUninitialized: true, store: memoryStore }));
let keycloak = new Keycloak({ store: memoryStore }, config.KEY_CLOAK.REALMS_KEYCLOAK_CONFIG);
app.use(keycloak.middleware({ logout: '/logout' }));
// end keycloak config

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

process.setMaxListeners(0);
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


server = app.listen(config.SERVER.PORT, () => {
  console.log('server listen port: ' + config.SERVER.PORT);
});

router(app, keycloak);
app.use(function (err, req, res, next) {
  let message = err.message || err.stack || '';
  log.error('error', `${err.stack.toString()} | api: ${req.path} | body_Request: ${req.body ? JSON.stringify(req.body) : ''}`);
  console.log('error', `${err.stack.toString()} | api: ${req.path} | body_Request: ${req.body ? JSON.stringify(req.body) : ''}`);
  res.err = message;
  switch (err.status) {
    case httpStatus.NOT_FOUND:
      res.status(httpStatus.NOT_FOUND).json(response.responseError(messagesList.messageCommon.error, message));
      break;
    case httpStatus.SERVER_ERROR:
      res.status(httpStatus.SERVER_ERROR).json(response.responseError(messagesList.messageCommon.error, message));
      break;
    case httpStatus.BAD_REQUEST:
      res.status(httpStatus.SERVER_ERROR).json(response.responseError(messagesList.messageCommon.error, message));
      break;
    case httpStatus.NOTIFICATION_ERROR:
      console.log(err.stack);
      break;
    default:
      res.status(httpStatus.SERVER_ERROR).json(response.responseError(messagesList.messageCommon.error, message));
      break;
  }
});
// ================================ init with param belows ========================
console.log('env : ', env);
console.log('port Server: ', config.SERVER.PORT);

console.log('realmsPublicKey: ', config.KEY_CLOAK.REALMS_KEYCLOAK_CONFIG.realm);
console.log('clientName: ', config.KEY_CLOAK.REALMS_KEYCLOAK_CONFIG.clientId);
console.log('ipKeyCloak: ', config.KEY_CLOAK.REALMS_KEYCLOAK_CONFIG.serverUrl);

console.log('finish');

// ================================ the end -============== ========================
module.exports = server;

