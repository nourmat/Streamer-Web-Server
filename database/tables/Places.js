const SQL = require("mssql");

const TABLE_NAME = "Places";

//Column names
const db_PLACE_ID = "Place_ID";
const db_USER_ID = "User_ID";
const db_NAME = "Name";
const db_IP = "IP";

// async function db_place_add_place(user_id, name, ip) {
//     var request = new SQL.Request();

//     return request.query(`INSERT INTO ${TABLE_NAME} (${db_USER_ID}, ${db_NAME}, ${db_IP}) VALUES ('${user_id}', '${name}', '${ip}')`)
//     .then((recordset) => {
//         console.log(recordset);
//     }).catch(err => {
//         console.log(err);
//     });
// }

async function db_check_if_place_id_belongs_to_user_id(place_id, user_id) {
    var request = new SQL.Request();

    return request.query(`SELECT COUNT(${db_PLACE_ID}) FROM ${TABLE_NAME} WHERE ${db_PLACE_ID}= '${place_id}' AND ${db_USER_ID}='${user_id}'`)
    .then((recoredset) => {
        if (recoredset.recordset[0][''] > 0)
            return true;
        else
            return false;
    }).catch(err => {
        console.log(err);
    })
}

async function db_place_get_all_places_for_user_id(user_id) {
    var request = new SQL.Request();

    return request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USER_ID}='${user_id}'`)
    .then((recordset) => {
        return recordset.recordset;
    }).catch(err => {
        console.log(err);
    });
}

// async function db_place_delete_place_using_id(place_id) {
//     var request = new SQL.Request();

//     return request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_PLACE_ID}=${place_id}`)
//     .then((recordset) => {
//         console.log(recordset);
//     }).catch(err => {
//         console.log(err);
//     });
// }

// async function db_place_delete_place_using_ip(ip) {
//     var request = new SQL.Request();

//     return request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_IP}=${ip}`)
//     .then((recordset) => {
//         console.log(recordset);
//     }).catch(err => {
//         console.log(err);
//     });
// }

// async function db_place_clear_places_db() {
//     var request = new SQL.Request();

//     return request.query(`DELETE FROM ${TABLE_NAME} *`)
//     .then((recordset) => {
//         console.log(recordset);
//     }).catch(err => {
//         console.log(err);
//     });
// }

module.exports = {
    TABLE_NAME,
    db_PLACE_ID,
    db_USER_ID,
    db_NAME,
    db_IP,
    // db_place_add_place,
    db_check_if_place_id_belongs_to_user_id,
    db_place_get_all_places_for_user_id,
    // db_place_delete_place_using_id,
    // db_place_delete_place_using_ip,
    // db_place_clear_places_db
};