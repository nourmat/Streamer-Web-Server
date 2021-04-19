const express = require('express');

const indexRouter = require('./pages/indexRouter');
// var streamRouter = require('./pages/streamRouter');
var historyRouter = require('./pages/historyRouter');
const apiRouter = require('./api/apiRouter');

const pagesRouter = express.Router();

pagesRouter.use('/', indexRouter);
// pagesRouter.use('/stream', streamRouter);
pagesRouter.use('/history', historyRouter);
pagesRouter.use('/api', apiRouter);

module.exports = pagesRouter;