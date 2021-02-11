const express = require('express');
const bodyParser = require('body-parser');
const db_places = require('../database/Places');

const {
    application,
    json
} = require('express');
const placeApiRouter = express.Router();

placeApiRouter.use(bodyParser.json());

placeApiRouter.route('/')
    .get((req, res, next) => {
        var user_id = req.query.user_id;

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
    })
    .post((req, res, next) => {
        var user_id = req.query.user_id;
        var name = req.query.name;
        var ip = req.query.ip;

        if (!user_id || !name || !ip) {
            res.statusCode = 404;
            res.end();
        } else {
            db_places.db_place_add_place(user_id, name, ip)
                .then(() => {
                    res.statusCode = 200;
                    res.end();
                }).catch((err) => {
                    console.log(err);
                });
        }
    })
    .delete((req, res, next) => {
        var place_id = req.query.place_id;
        var ip = req.query.ip;

        if (!place_id && !ip) {
            res.statusCode = 404;
            res.end();
        } else {
            if (place_id) {
                db_places.db_place_delete_place_using_id(place_id)
                    .then(() => {
                        res.statusCode = 200;
                        res.end();
                    }).catch((err) => {
                        console.log(err);
                    });
            } else if (ip) {
                db_places.db_place_delete_place_using_ip(ip)
                    .then(() => {
                        res.statusCode = 200;
                        res.end();
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    });

module.exports = placeApiRouter;