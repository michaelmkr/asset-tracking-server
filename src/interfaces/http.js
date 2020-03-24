const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const httpStatus = require('http-status');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');
const APIError = require('../utils/error');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, true);
    return next(apiError);
  }
  return next(err);
});

// 404
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND, true);
  return next(err);
});

// error handler
app.use((err, req, res, next) => res.status(err.status).json({ // eslint-disable-line no-unused-vars
  error: err.isPublic ? err.message : httpStatus[err.status],
}));

module.exports = app;
