"use strict";

var log4js = require('log4js');
log4js.configure({
    appenders: {
        out: {
            type: 'console'
        },
        app: {
            type: 'dateFile',
            filename: 'logs/site',
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true
        }
    },
    categories: {
        warning: {
            appenders: ['out', 'app'],
            level: 'debug'
        },
        default: {
            appenders: ['out', 'app'],
            level: 'debug'
        }
    }
});
var log = log4js.getLogger('build-project');
var logError = log4js.getLogger('build-project-error');
var logDebug = log4js.getLogger('build-project-debug');
exports.log = log;
exports.logError = logError;
exports.logDebug = logDebug;

exports.qlog = (txt, ...agrs) => {
    const err = new Error();
    const caller_line = err.stack.split("\n")[2];
    const clean = caller_line.trim().substring(3);
    console.log(` \n\n\n <<<================ <LOG::${txt}> ================ `);
    if (agrs) console.log(`\n ${clean} \n`, ...agrs);
    console.log(` ================ </LOG::${txt}> ================>>> \n `, );
};