const express = require('express');
const bodyParser = require('body-parser');
const db_cameras = require('../database/Cameras');

const {
    application,
    json
} = require('express');
const cameraApiRouter = express.Router();

cameraApiRouter.use(bodyParser.json());

cameraApiRouter.route('/')
    .get((req, res, next) => {
        var place_id = req.query.place_id;

        if (!place_id) {
            res.statusCode = 404;
            res.end();
        } else {
            db_cameras.db_camera_get_all_cameras_for_place_id(place_id)
                .then((recordset) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', application / json);
                    res.json(recordset);
                }).catch((err) => {
                    console.log(err);
                });
        }
    })
    .post((req, res, next) => {
        var place_id = req.query.place_id;
        var name = req.query.name;
        var port = req.query.port;

        if (!place_id || !name || !port) {
            res.statusCode = 404;
            res.end();
        } else {
            db_cameras.db_camera_add_camera(place_id, name, port)
                .then(() => {
                    res.statusCode = 200;
                    res.end();
                }).catch((err) => {
                    console.log(err);
                });
        }
    })
    .delete((req, res, next) => {
        var camera_id = req.query.camera_id;

        if (!camera_id) {
            res.statusCode = 404;
            res.end();
        } else {
            db_cameras.db_camera_delete_camera_using_id(camera_id)
                .then(() => {
                    res.statusCode = 200;
                    res.end();
                }).catch((err) => {
                    console.log(err);
                });
        }
    });

module.exports = cameraApiRouter;