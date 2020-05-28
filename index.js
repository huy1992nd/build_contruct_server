"use strict";

const {log} = require('./lib/log');
global.log = log;
const appController = require('./controller/app.controller');

async function Init() {
    log.info("==================== START APP ====================");
    appController.Init();
}

Init();