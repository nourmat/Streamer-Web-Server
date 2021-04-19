const express = require('express');
const authController = require('../../controllers/authController');
const dataController = require('../../controllers/dataController');

const placeApiRouter = express.Router();

placeApiRouter.route('/')
    .get(authController.authenticateTokenOnly, 
         dataController.getPlaces);

    // .post((req, res, next) => {
    //     var user_id = req.query.user_id;
    //     var name = req.query.name;
    //     var ip = req.query.ip;

    //     if (!user_id || !name || !ip) {
    //         res.statusCode = 404;
    //         res.end();
    //     } else {
    //         db_places.db_place_add_place(user_id, name, ip)
    //             .then(() => {
    //                 res.statusCode = 200;
    //                 res.end();
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // })
    // .delete((req, res, next) => {
    //     var place_id = req.query.place_id;
    //     var ip = req.query.ip;

    //     if (!place_id && !ip) {
    //         res.statusCode = 404;
    //         res.end();
    //     } else {
    //         if (place_id) {
    //             db_places.db_place_delete_place_using_id(place_id)
    //                 .then(() => {
    //                     res.statusCode = 200;
    //                     res.end();
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 });
    //         } else if (ip) {
    //             db_places.db_place_delete_place_using_ip(ip)
    //                 .then(() => {
    //                     res.statusCode = 200;
    //                     res.end();
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 });
    //         }
    //     }
    // });

module.exports = placeApiRouter;