const db_users = require('../database/tables/Users');
const fs = require('fs')
const {
    application,
    json
} = require('express');
const logFileLocation = '/home/nourmat/Projects/surveillance-ml/'
const imageFolderLocation = '/home/nourmat/Projects/surveillance-ml/log_img/'


exports.getLogs = (req, res) => {
  const user_id = req.user.id; /* saved inside token */ 
  const {place_id, camera_id} = req.query; /* GET */

  fs.readFile(logFileLocation + 'log.out', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        res.statusCode = 404;
        res.end()
        return
      }

      var rows = splitLogsData(data) // array of jsons

      /* check that place_id and camera_id belongs to user_id */
      db_users.db_user_check_user_id_place_id_camera_id(user_id, place_id, camera_id)
      .then((recordset) => {
          if (recordset) {
            res.statusCode = 200;
            res.render(__dirname + './../public/userPlace/logs', {
                cameraName: recordset.Name[1],
                placeName: recordset.Name[0],
                LOGSDATA: rows
            });
          } else {
              res.statusCode = 401; /* forbiden */
              res.redirect ("/api/auth/logout");
          }
      })
    })
}

exports.getImageFromPath = (req, res) => {
  const user_id = req.user.id; /* saved inside token */ 
  const {image_path} = req.query; /* GET */

  fs.readFile(imageFolderLocation + image_path, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        res.statusCode = 404;
        res.end()
        return
      }
      
      res.sendFile(imageFolderLocation + image_path)
    })
}

// ----------HELPER -------------------

function splitLogsData (data) {
  // split each row seperated by newline,then pop last empty line
  var rows = data.split('\n')
  rows.pop()

  for (var i = 0; i < rows.length; i++) {
    // split each row seperated by comma and space
    rows[i] = rows[i].split(/, /i)

    rows[i] = {
      timestamp: rows[i][0],
      action: rows[i][1],
      image_path: rows[i][2]
    }
  }

  return rows
}

// const csv = require('csv-parse');
// var csvParser = csv({columns: false}, function (err, records) {
// 	console.log(records);
// });

// exports.getPlaces = (req, res) => {
//     var user_id = req.user.id; /* saved inside token */

//     if (!user_id) {
//         res.statusCode = 404;
//         res.end();
//     } else {
//         db_places.db_place_get_all_places_for_user_id(user_id)
//             .then((recordset) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', application / json);
//                 res.json(recordset);
//             }).catch((err) => {
//                 console.log(err);
//             });
//     }
// }

// exports.getCameras = (req, res) => {
//     var user_id = req.user.id; /* saved inside token */
//     var place_id = req.query.place_id;

//     if (!place_id) {
//         res.statusCode = 404;
//         res.end();
//         return;
//     } 
//     else {
//         /* check if place_id belongs to user_id */
//         db_places.db_check_if_place_id_belongs_to_user_id(place_id, user_id)
//         .then((exists) => {
//             if (exists) {
//                 db_cameras.db_camera_get_all_cameras_for_place_id(place_id)
//                 .then((recordset) => {
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', application / json);
//                     res.json(recordset);
//                 }).catch((err) => {
//                     console.log(err);
//                 });
//             } 
//             else {
//                 res.statusCode = 401;
//                 res.end();
//             }
//         }).catch((err) => {
//             console.log(err);
//         });
//     }
// }