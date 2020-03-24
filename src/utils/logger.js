const winston = require('winston');

const config = require('../config');

const level = config.get('logging.level');

const logger = winston.createLogger({
  level,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({}),
  ],
});

module.exports = logger;
