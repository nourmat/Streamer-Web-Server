const express = require('express');

const indexRouter = require('./pages/indexRouter');
const streamRouter = require('./pages/streamRouter');
const historyRouter = require('./pages/historyRouter');
const logsRouter = require('./pages/logsRouter');
const apiRouter = require('./api/apiRouter');

const pagesRouter = express.Router();

pagesRouter.use('/', indexRouter);
pagesRouter.use('/stream', streamRouter);
pagesRouter.use('/history', historyRouter);
pagesRouter.use('/logs', logsRouter);
pagesRouter.use('/api', apiRouter);

module.exports = pagesRouter;