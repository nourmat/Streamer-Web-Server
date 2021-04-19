const db_users = require('../database/tables/Users');
const AWS = require('./../AWS/AWS');
// const db_places = require('../database/tables/Places');
// const db_cameras = require('../database/tables/Cameras');
const {
    application,
    json
} = require('express');

exports.loadHistory = (req, res, next) => {
    const user_id = req.user.id; /* saved inside token */ 
    // const {place_id, camera_id} = req.body; /* POST */
    const {place_id, camera_id} = req.query; /* GET */

    /* check that place_id and camera_id belongs to user_id */
    db_users.db_user_check_user_id_place_id_camera_id(user_id, place_id, camera_id)
        .then((recordset) => {
            if (recordset) {
                req.flash('cameraName', recordset.Name[1]);

                AWS.ListObjectsWithPrefix (recordset.IP + '-' + recordset.Camera_ID, (data) => {
                    console.log (data.Contents);
                    next();
                })
            }
        })
} 