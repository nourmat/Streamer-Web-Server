const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const AWS = require('../AWS');

const { application, json } = require('express');
const historyRouter = express.Router();

historyRouter.use(bodyParser.json());

//Request for main page
historyRouter.route('/')
    .get((req, res, next) => {

        var IP = req.query.IP;
        var Camera_Id = req.query.Camera_Id;

        if (!IP || !Camera_Id)
            res.sendFile(path.join(__dirname, '../public/history.html'));
        else { //Send list of data for that user with prefix
            res.statusCode = 200;
            res.setHeader('Content-Type', application / json);
            AWS.ListObjectsWithPrefix(IP + '-' + Camera_Id, (data) => {
                res.json(data.Contents);
            });
        }
    });

//Request for downloading a video
historyRouter.route('/download')
    .get((req, res, next) => {
        var filename = req.query.filename;

        AWS.getObjectAndDownload(filename, (url) => {
            res.statusCode = 302; //Temporary redirect
            res.setHeader("Location", url);
            res.end();
        });
    });

module.exports = historyRouter;