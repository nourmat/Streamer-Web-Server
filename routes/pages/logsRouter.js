const express = require('express');
const authController = require('./../../controllers/authController');
const logsController = require('./../../controllers/logsController');

const logsRouter = express.Router();

logsRouter.route('/')
    .get(authController.authenticateTokenAndRedirect, 
         logsController.getLogs);


logsRouter.route('/download')
    .get(authController.authenticateTokenAndRedirect, 
         logsController.getImageFromPath);
     

module.exports = logsRouter;