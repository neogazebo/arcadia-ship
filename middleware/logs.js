const winston = require('winston');
const expressWinston = require('express-winston');
const appRoot = require('app-root-path');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
exports.accessLogger = expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.prettyPrint(),
      }),
      new winston.transports.File({
        level: 'info',
        filename: `${appRoot}/logs/access.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      }),
    ]
  });

exports.errorLogger = expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      }),
    ],
  });  