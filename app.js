var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var streamRouter = require('./routes/streamRouter');
var historyRouter = require('./routes/historyRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//the client must be authenticated first
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stream', streamRouter);
app.use('/history', historyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

//Check authentication before retriving data
function auth(req, res, next) {
    //console.log(req.headers);

    var authHeader = req.headers.authorization;

    //User didn't send username & password
    if (!authHeader) {
        var err = new Error('You are not authenticated!');

        res.setHeader('www-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    //split it to array after Basic string
    //auth should be an array with two values username and password
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password === 'password') {
        next();
    } else {
        var err = new Error('You are not authenticated!');

        res.setHeader('www-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}