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

module.exports = {
    db_config
};