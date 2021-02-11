var express = require('express');
var loginRouter = express.Router();

/* GET home page. */
loginRouter.get('/', function(req, res, next) {
    res.render('Login', { title: 'Express' });
});

module.exports = loginRouter;