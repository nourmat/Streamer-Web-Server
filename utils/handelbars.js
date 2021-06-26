var hbs = require('hbs');

hbs.registerHelper("getDate", function(filename) {
    //assuming filename is in the formate: "192.168.1.1-1-1613500825000"
    let timestamp = filename.split('-').slice(-1)[0];
    let date = new Date(+timestamp).toLocaleString();
    //example on how date looks like: 16/02/2021, 20:40:25
    return date;
});

hbs.registerHelper("getDateFromTimeStamp", function(timestamp) {
    return new Date(1000 * timestamp).toLocaleString()
});
