const express = require('express');

const httpStatus = require('http-status');

const locationController = require('../controllers/location-controller');

const logger = require('../utils/logger');
const logToFile = require('../utils/fileLogger');
const APIError = require('../utils/error');

const router = express.Router();

// GET /location
// get all machines with location
router.get('/location', async (req, res, next) => {
  try {
    const result = await locationController.getAll();
    res.send(result);
    return logToFile.router({
      method: req.method,
      path: req.url,
    });
  } catch (error) {
    logger.info(error.message);
    return next(new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true));
  }
});


// GET /location/:id
// get all data for one specific machine
router.get('/location/:id', async (req, res, next) => {
  try {
    const result = await locationController.getId(req.params.id);
    res.json(result);
    return logToFile.router({
      method: req.method,
      path: req.url,
      params: req.params,
    });
  } catch (error) {
    logger.info(error.message);
    return next(new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true));
  }
});


router.post('/location', async (req, res, next) => {
  try {
    // TODO
    // POST /location
    // const result = await locationController.get(req.body);
    // res.json(result);
    res.send('200 OK');
    return logToFile.router({
      method: req.method,
      path: req.url,
      body: req.body,
    });
  } catch (error) {
    logger.info(error.message);
    return next(new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true));
  }
});

router.post('/updateDetails', async (req, res, next) => {
  try {
    // TODO
    // update machine details
    // const result = await locationController.get(req.body);
    // res.json(result);
    res.send('200 OK');
    return logToFile.router({
      method: req.method,
      path: req.url,
      body: req.body,
    });
  } catch (error) {
    logger.info(error.message);
    return next(new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true));
  }
});

// TODO
// post a new machine

module.exports = router;
