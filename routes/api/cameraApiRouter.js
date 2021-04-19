const express = require('express');
const authController = require('../../controllers/authController');
const dataController = require('../../controllers/dataController');

const {
    application,
    json
} = require('express');

const cameraApiRouter = express.Router();

cameraApiRouter.route('/')
    .get(authController.authenticateTokenOnly,
         dataController.getCameras);
    // // .post((req, res, next) => {
    // //     var place_id = req.query.place_id;
    // //     var name = req.query.name;
    // //     var port = req.query.port;

    // //     if (!place_id || !name || !port) {
    // //         res.statusCode = 404;
    // //         res.end();
    // //     } else {
    // //         db_cameras.db_camera_add_camera(place_id, name, port)
    // //             .then(() => {
    // //                 res.statusCode = 200;
    // //                 res.end();
    // //             }).catch((err) => {
    // //                 console.log(err);
    // //             });
    // //     }
    // // })
    // // .delete((req, res, next) => {
    // //     var camera_id = req.query.camera_id;

    // //     if (!camera_id) {
    // //         res.statusCode = 404;
    // //         res.end();
    // //     } else {
    // //         db_cameras.db_camera_delete_camera_using_id(camera_id)
    // //             .then(() => {
    // //                 res.statusCode = 200;
    // //                 res.end();
    // //             }).catch((err) => {
    // //                 console.log(err);
    // //             });
    // //     }
    // });

module.exports = cameraApiRouter;