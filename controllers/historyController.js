const db_users = require('../database/tables/Users');
const AWS = require('./../AWS/AWS');

exports.loadHistory = (req, res, next) => {
    const user_id = req.user.id; /* saved inside token */ 
    // const {place_id, camera_id} = req.body; /* POST */
    const {place_id, camera_id} = req.query; /* GET */

    /* check that place_id and camera_id belongs to user_id */
    db_users.db_user_check_user_id_place_id_camera_id(user_id, place_id, camera_id)
        .then((recordset) => {
            if (recordset) {
                AWS.ListObjectsWithPrefix (recordset.IP + '-' + recordset.Camera_ID, (data) => {
                    res.statusCode = 200;
                    res.render(__dirname + './../public/userPlace/history', {
                        cameraName: recordset.Name[1],
                        placeName: recordset.Name[0],
                        AWSDATA: data.Contents
                    });
                })
            } else {
                res.statusCode = 401; /* forbiden */
                res.redirect ("/api/auth/logout");
            }
        })
} 

exports.downloadFile = (req, res) => {
    var filename = req.query.filename;
        
    AWS.getObjectAndDownload(filename, (url) => {
        res.statusCode = 302; //Temporary redirect
        res.redirect(url);
    });
}