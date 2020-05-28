'use strict';
var winston = require('winston');
// require('winston-mysql-transport').Mysql;
winston.emitErrs = true;
var path = require('path');
const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Define options for Date#toLocaleTimeString call we will use.
var twoDigit = '2-digit';
var options = {
    day: twoDigit,
    month: twoDigit,
    year: twoDigit,
    hour: twoDigit,
    minute: twoDigit,
    second: twoDigit
};

function formatterNotJson(args) {
    var dateTimeComponents = new Date().toLocaleTimeString('en-us', options).split(',');
    var logMessage = dateTimeComponents[0] + dateTimeComponents[1] + ' - ' + args.level + ': ' + args.message;
    return logMessage;
}

var logger = new winston.Logger({
    transports: [
        // new winston.transports.Mysql(options),
        new winston.transports.File({
            name: 'info-file',
            filename: `${logDir}/info.log`,
            level: 'info',
            maxsize: 1000000,
            formatter: formatterNotJson,
            json: false
        }),
        new winston.transports.File({
            name: 'error-file',
            filename: `${logDir}/error.log`,
            level: 'error',
            maxsize: 1000000,
            formatter: formatterNotJson,
            json: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: false,
            json: false,
            colorize: false,
            timestamp: function () {
                var date = new Date();

                var hour = date.getUTCHours();
                hour = (hour < 10 ? '0' : '') + hour;

                var min = date.getUTCMinutes();
                min = (min < 10 ? '0' : '') + min;

                var sec = date.getUTCSeconds();
                sec = (sec < 10 ? '0' : '') + sec;

                var year = date.getUTCFullYear();

                var month = date.getUTCMonth() + 1;
                month = (month < 10 ? '0' : '') + month;

                var day = date.getUTCDate();
                day = (day < 10 ? '0' : '') + day;

                var millisecond = date.getUTCMilliseconds();

                return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '.' + millisecond;

            },
            formatter: function (options) {
                return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message) {
        logger.info(message);
        logger.error(message);
    }
};