const {createLogger, format, transports} = require('winston');
const {combine, timestamp, json, errors} = format;

function buildDevLogger() {
  return createLogger({
    format: combine(
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        errors({stack: true}),
        json(),
    ),
    transports: [
      new transports.Console,
      new transports.File({filename: 'combined.log'}),
    ],
  });
}

module.exports = buildDevLogger;
