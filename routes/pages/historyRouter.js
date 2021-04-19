const express = require('express');
const path = require('path');
const authController = require('./../../controllers/authController');
const historyController = require('./../../controllers/historyController');

const historyRouter = express.Router();

//Request for main page
historyRouter.route('/')
    .get(authController.authenticateTokenAndRedirect,
        historyController.loadHistory,
        (req, res) => {
            res.statusCode = 200;
            res.render(__dirname + './../../public/userPlace/history', {
                cameraName: req.flash("cameraName"),
                AWSDATA: req.flash("AWSData")
            });
        });


    // .get((req, res) => {
    //     var Place_Id = req.query.Place_Id;
    //     var Camera_Id = req.query.Camera_Id;

    //     if (!IP || !Camera_Id)
    //         // res.render(__dirname + './../../public/userPlace/userHomepage');
    //         res.render(__dirname + './../../public/userPlace/history');
    //     else { //Send list of data for that user with prefix
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', application / json);
    //         AWS.ListObjectsWithPrefix(IP + '-' + Camera_Id, (data) => {
    //             res.json(data.Contents);
    //         });
    //     }
    // });

//Request for downloading a video
historyRouter.route('/download')
    .get((req, res) => {
        var filename = req.query.filename;

        AWS.getObjectAndDownload(filename, (url) => {
            res.statusCode = 302; //Temporary redirect
            res.redirect(url);
            // res.setHeader("Location", url);
            // res.end();
        });
    });

module.exports = historyRouter;