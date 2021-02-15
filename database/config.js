var SQL = require("mssql");

const db_config = {
    user: "sa",
    password: "<YourStrong@Passw0rd>",
    server: "localhost",
    database: "streamer_db",

    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

SQL.connect(db_config, (err) => {
    if (err)
        console.log(err);
    else
    console.log("Connected to SQL database!!!");
});


module.exports = {
    db_config
};