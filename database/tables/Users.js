const SQL = require("mssql");
const db_places = require('./Places');
const db_cameras = require('./Cameras');
const config = require("./../config");

const TABLE_NAME = "Users";

//Column names
const db_USER_ID = "User_ID";
const db_USERNAME = "Username";
const db_EMAIL = "Email";
const db_PASSWORD = "Password";

async function db_user_check_user_id_place_id_camera_id (user_id, place_id, camera_id) {
    var request = new SQL.Request();

    return await request.query(`SELECT ${TABLE_NAME}.${db_USER_ID}, ${db_places.TABLE_NAME}.${db_places.db_PLACE_ID}, ${db_cameras.TABLE_NAME}.${db_cameras.db_CAMERA_ID},
                                ${db_places.TABLE_NAME}.${db_places.db_NAME}, ${db_cameras.TABLE_NAME}.${db_cameras.db_NAME}, ${db_places.TABLE_NAME}.${db_places.db_IP}
                                FROM ${TABLE_NAME}
                                INNER JOIN ${db_places.TABLE_NAME} ON ${TABLE_NAME}.${db_USER_ID}=${db_places.TABLE_NAME}.${db_places.db_USER_ID}
                                INNER JOIN ${db_cameras.TABLE_NAME} ON ${db_places.TABLE_NAME}.${db_places.db_PLACE_ID}=${db_cameras.TABLE_NAME}.${db_cameras.db_PLACE_ID}
                                WHERE ${TABLE_NAME}.${db_USER_ID}=${user_id} 
                                AND ${db_places.TABLE_NAME}.${db_places.db_PLACE_ID}=${place_id}
                                AND ${db_cameras.TABLE_NAME}.${db_cameras.db_CAMERA_ID}=${camera_id}`)
        .then((recordset) => {
            if (recordset.recordset.length > 0)
                return recordset.recordset[0];
            else
                return null;
        }).catch(err => {
            console.log(err);
        })
}

async function db_user_check_if_already_in_database (username, email) {
    var request = new SQL.Request();
        
    return await request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USERNAME}='${username}' OR ${db_EMAIL}='${email}'`)
        .then((recordset) => {
            if (recordset.recordset.length > 0)
                return recordset.recordset[0];
            else
                return null;
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_add_user(username, email, password) {
    var request = new SQL.Request();

    return await request.query(`INSERT INTO ${TABLE_NAME} (${db_USERNAME}, ${db_EMAIL}, ${db_PASSWORD}) VALUES ('${username}', '${email}', '${password}')`)
        .then((recordset) => {
            console.log("A new account has been added");
        }).catch(err => {
            console.log(err);
        });
}

// async function db_user_get_user_using_id(user_id) {
//     var request = new SQL.Request();

//     return await request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USER_ID}=${user_id}`)
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

// async function db_user_get_user_using_username(username) {
//     var request = new SQL.Request();

//     return await request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USERNAME}=${username}`)
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

// async function db_user_delete_user_using_id(user_id) {
//     var request = new SQL.Request();

//     return await request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_USER_ID}=${user_id}`)
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

// async function db_user_delete_user_using_username(username) {
//     var request = new SQL.Request();

//     return await request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_USERNAME}=${username}`)
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

// async function db_user_clear_users_db() {
//     var request = new SQL.Request();

//     return await request.query(`DELETE FROM ${TABLE_NAME} *`)
//         .then((recordset) => {
//             console.log(recordset);
//         }).catch(err => {
//             console.log(err);
//         });
// }

module.exports = {
    db_user_check_user_id_place_id_camera_id,
    db_user_check_if_already_in_database,
    db_user_add_user,
    // db_user_get_user_using_id,
    // db_user_get_user_using_username,
    // db_user_delete_user_using_id,
    // db_user_delete_user_using_username,
    // db_user_clear_users_db
};