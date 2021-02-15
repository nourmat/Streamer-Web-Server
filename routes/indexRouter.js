var express = require('express');
const path = require('path');

const indexRouter = express.Router();

indexRouter.route('/')
    .get((req, res, next) => {
        console.log("fick");
        res.statusCode = 200;
        res.sendFile(path.join(__dirname, '../public/Login.html'));
    });

indexRouter.route('/homepage')
    .get((req, res, next) => {
        console.log("fick");
        res.statusCode = 200;
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
indexRouter.use('/homepage', express.static(path.join(__dirname, '../public')));

module.exports = indexRouter;