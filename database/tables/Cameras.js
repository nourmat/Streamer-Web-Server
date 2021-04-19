const SQL = require("mssql");

const TABLE_NAME = "Cameras";

//Column names
const db_CAMERA_ID = "Camera_ID";
const db_PLACE_ID = "Place_ID";
const db_NAME = "Name";
const db_PORT = "PORT";

// async function db_camera_add_camera(place_id, name, port) {
//     return await SQL.connect(config.db_config)
//         .then(() => {
//             var request = new SQL.Request();

//             return request.query(`INSERT INTO ${TABLE_NAME} (${db_PLACE_ID}, ${db_NAME}, ${db_PORT}) VALUES ('${place_id}', '${name}', '${port}')`);
//         })
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

async function db_camera_get_all_cameras_for_place_id(place_ID) {
        var request = new SQL.Request();

        return request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_PLACE_ID}='${place_ID}'`)
        .then((recordset) => {
            return recordset.recordset;
        }).catch(err => {
            console.log(err);
        });
}

// async function db_camera_delete_camera_using_id(camera_id) {
//     return await SQL.connect(config.db_config)
//         .then(() => {
//             var request = new SQL.Request();

//             return request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_CAMERA_ID}=${camera_id}`);
//         })
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

// async function db_camera_clear_cameras_db() {
//     return await SQL.connect(config.db_config)
//         .then(() => {
//             var request = new SQL.Request();

//             return request.query(`DELETE FROM ${TABLE_NAME} *`);
//         })
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

module.exports = {
    TABLE_NAME,
    db_CAMERA_ID,
    db_PLACE_ID,
    db_NAME,
    db_PORT,
    // db_camera_add_camera,
    db_camera_get_all_cameras_for_place_id,
    // db_camera_delete_camera_using_id,
    // db_camera_clear_cameras_db
};