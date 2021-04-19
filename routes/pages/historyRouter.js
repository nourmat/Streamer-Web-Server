const express = require('express');
const authController = require('./../../controllers/authController');
const historyController = require('./../../controllers/historyController');

const historyRouter = express.Router();

//Request for main page
historyRouter.route('/')
    .get(authController.authenticateTokenAndRedirect,
        historyController.loadHistory);

//Request for downloading a video
historyRouter.route('/download')
    .get(authController.authenticateTokenAndRedirect,
        historyController.downloadFile);

module.exports = historyRouter;