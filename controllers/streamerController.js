const db_users = require('../database/tables/Users');
const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisClient = redis.createClient();

exports.loadStreamPage = (req, res, next) => {
    const user_id = req.user.id; /* saved inside token */ 
    const {place_id, camera_id} = req.query; /* GET */

    // /* check that place_id and camera_id belongs to user_id */
    db_users.db_user_check_user_id_place_id_camera_id(user_id, place_id, camera_id)
        .then((recordset) => {
            if (recordset) {
                // return camera stream page
                res.statusCode = 200;
                res.render(__dirname + './../public/userPlace/stream', {
                    cameraName: recordset.Name[1],
                    placeName: recordset.Name[0],
                    cameraData: {Place_ID: recordset.Place_ID, 
                                 Camera_ID: recordset.Camera_ID,
                                 IP: recordset.IP}
                });
            } else {
                res.statusCode = 401; /* forbiden */
                res.redirect ("/api/auth/logout");
            }
        })
} 

exports.startStreamer = (ws, req) => {
    const user_id = req.user.id; /* saved inside token */
    const {place_id, camera_id, ip} = req.query; /* GET */

    if (!user_id) { //failed in token verification
        ws.close();
        ws.destroy();
        return;
    }

    var getImage = true;
    var interval = setInterval(() => {
        if (getImage) {
            getImage = false;

            redisClient.getAsync(ip + '-' + camera_id)
            .then((imageBase64) => {
                getImage = true;
                ws.send(imageBase64);
            })
            .catch((err) => {
                getImage = true;
                console.log(err);
            });
        }
    }, 50);

    ws.on('close', function close() {
        clearInterval(interval);
    });
}
