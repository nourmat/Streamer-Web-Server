var SQL = require("mssql");
var config = require("./config");

const TABLE_NAME = "Users";

//Column names
const db_USER_ID = "User_ID";
const db_USERNAME = "Username";
const db_EMAIL = "Email";
const db_PASSWORD = "Password";

async function db_user_user_exsist(username, password) {

    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USERNAME}='${username}' AND ${db_PASSWORD}='${password}'`);
        })
        .then((recordset) => {
            if (recordset.recordset.size > 0)
                return true;
            else
                return false;
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_add_user(username, email, password) {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`INSERT INTO ${TABLE_NAME} (${db_USERNAME}, ${db_EMAIL}, ${db_PASSWORD}) VALUES ('${username}', '${email}', '${password}')`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_get_user_using_id(user_id) {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USER_ID}=${user_id}`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_get_user_using_username(username) {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`SELECT * FROM ${TABLE_NAME} WHERE ${db_USERNAME}=${username}`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_delete_user_using_id(user_id) {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_USER_ID}=${user_id}`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_delete_user_using_username(username) {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`DELETE FROM ${TABLE_NAME} WHERE ${db_USERNAME}=${username}`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

async function db_user_clear_users_db() {
    return await SQL.connect(config.db_config)
        .then(() => {
            var request = new SQL.Request();

            return request.query(`DELETE FROM ${TABLE_NAME} *`);
        })
        .then((recordset) => {
            console.log(recordset);
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {
    db_user_user_exsist,
    db_user_add_user,
    db_user_get_user_using_id,
    db_user_get_user_using_username,
    db_user_delete_user_using_id,
    db_user_delete_user_using_username,
    db_user_clear_users_db
};