const express = require("express");
const path = require('path');
// const logger = require('morgan');
const flash = require('connect-flash'); /* requires cookireParser and session */
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressWebSocket = require('express-ws');
const http = require('http');
const hbs = require('./utils/handelbars');

const app = express();
const httpServer = http.Server(app);
const expressWebSocketServer = expressWebSocket(app, httpServer);
const pagesRouter = require('./routes/pagesRouter');

/* view engine setup */
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(logger('dev'));
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
                            secret: 'woot',
                            resave: false, 
                            saveUninitialized: false}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pagesRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
    next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
    /* set locals, only providing error in development */
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /* render the error page */
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
    app: app,
    server: httpServer
};

// Changes made to work with express-ws
// https://stackoverflow.com/questions/40362258/package-express-ws-doesnt-let-clients-connect