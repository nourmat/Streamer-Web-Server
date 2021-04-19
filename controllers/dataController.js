const db_places = require('../database/tables/Places');
const db_cameras = require('../database/tables/Cameras');
const {
    application,
    json
} = require('express');

exports.getPlaces = (req, res) => {
    var user_id = req.user.id; /* saved inside token */

    if (!user_id) {
        res.statusCode = 404;
        res.end();
    } else {
        db_places.db_place_get_all_places_for_user_id(user_id)
            .then((recordset) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', application / json);
                res.json(recordset);
            }).catch((err) => {
                console.log(err);
            });
    }
}

exports.getCameras = (req, res) => {
    var user_id = req.user.id; /* saved inside token */
    var place_id = req.query.place_id;

    if (!place_id) {
        res.statusCode = 404;
        res.end();
        return;
    } 
    else {
        /* check if place_id belongs to user_id */
        db_places.db_check_if_place_id_belongs_to_user_id(place_id, user_id)
        .then((exists) => {
            if (exists) {
                db_cameras.db_camera_get_all_cameras_for_place_id(place_id)
                .then((recordset) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', application / json);
                    res.json(recordset);
                }).catch((err) => {
                    console.log(err);
                });
            } 
            else {
                res.statusCode = 401;
                res.end();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}