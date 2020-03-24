const convict = require('convict');

require('dotenv').config();

const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  logging: {
    level: {
      format: String,
      default: 'debug',
      env: 'LOG_LEVEL',
    },
  },
});

config.validate({ allowed: 'strict' });

module.exports = config;
