var winston = require('winston');
var appRoot = require('app-root-path');

var options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

function getLogger(module) {
var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

return new winston.createLogger({
  transports: [
  new (winston.transports.Console)(options.console),
  new (winston.transports.File)(options.errorFile),
  new (winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});
}

module.exports = getLogger;
