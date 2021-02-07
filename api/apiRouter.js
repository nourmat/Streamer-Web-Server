const express = require('express');
const bodyParser = require('body-parser');

// var userApiRouter = require('./userApiRouter');
var placeApiRouter = require('./placeApiRouter');
var cameraApiRouter = require('./cameraApiRouter');

var apiRouter = express.Router();

// apiRouter.use('/user', userApiRouter);
apiRouter.use('/place', placeApiRouter);
apiRouter.use('/camera', cameraApiRouter);

module.exports = apiRouter;