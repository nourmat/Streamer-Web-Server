const express = require('express');

const authRouter = require('./authRouter');
var placeApiRouter = require('./placeApiRouter');
var cameraApiRouter = require('./cameraApiRouter');

var apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/place', placeApiRouter);
apiRouter.use('/camera', cameraApiRouter);

module.exports = apiRouter;