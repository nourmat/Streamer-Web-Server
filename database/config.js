const SQL = require("mssql");
const dotenv = require("dotenv").config();

const db_config = {
    user: process.env.SQL_DATABASE_USER,
    password: process.env.SQL_DATABASE_PASSWORD,
    server: process.env.SQL_DATABASE_SERVER,
    port: parseInt(process.env.SQL_DATABASE_PORT, 10),
    database: process.env.SQL_DATABASE_NAME,

    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

SQL.connect(db_config, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Connected to MSSQL database!!!");
});

module.exports = {
    db_config
};