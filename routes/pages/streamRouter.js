const express = require('express');
const authController = require('./../../controllers/authController');
const streamController = require('./../../controllers/streamerController');

const streamRouter = express.Router();

streamRouter.route('/')
    .get(authController.authenticateTokenAndRedirect,
         streamController.loadStreamPage);

// WebSocket middleware (token verification) and webSocket server
streamRouter.use(authController.authenticateTokenOnly);
streamRouter.ws('/', streamController.startStreamer);

module.exports = streamRouter;