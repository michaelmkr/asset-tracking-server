const winston = require('winston');

const myFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json());

const logger = winston.createLogger({
  levels: {
    router: 0,
    all: 1,
  },
  level: 'all',
  format: myFormat,
  transports: [
    new winston.transports.File({
      filename: './logs/queries.log',
      handleExceptions: true,
      json: true,
    }),
  ],
});

module.exports = logger;
