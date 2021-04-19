const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const fs = require('fs');

const streamRouter = express.Router();
let client = redis.createClient();
var image_buffer;
var update_buffer = true;

// Conect to Redis
client.on('connect', () => {
    console.log("CONNECTED TO REDIS!!!");
    setInterval(updateImage, 35);
})

streamRouter.use(bodyParser.json());

streamRouter.route('/')
    .get((req, res, next) => {
        var IP = req.query.IP;
        var Camera_Id = req.query.Camera_Id;

        if (!IP || !Camera_Id)
            res.sendFile(path.join(__dirname, '../public/stream.html'));
        else {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });

            setInterval(() => {
                res.write("data: " + image_buffer + "\n\n");
            }, 50);

            res.write("data: " + image_buffer);
        }
    });

function sendLastImage(res) {
    // console.log(image_buffer.length);
    if (image_buffer) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Length', image_buffer.length);
        res.end(image_buffer);
    } else {
        res.statusCode = 404;
        res.end();
    }
}

function updateImage() {
    if (update_buffer) {
        update_buffer = false;
        client.get('192.168.1.101-1', (err, base64) => {
            if (base64)
                image_buffer = base64;
            // image_buffer = Buffer.from(base64, "base64");
            update_buffer = true;
        });
    }
}

// function updatePhoto() {
//     //Update Redis Image
//     client.get('192.168.43.1-1', (err, obj) => {
//         if (!obj)
//             console.log("<h1>Image not found</h1>")
//         else {
//             fs.writeFile(path.join(__dirname, '../public/out.jpg'),
//                 obj,
//                 'base64',
//                 (err) => {
//                     if (err)
//                         console.log(err);
//                 });
//         }
//     });
// }

//res.end("<html><body><h1>Image isn't found</h1></body>");

// console.log(base64);
// var image;
// image = Buffer.from(base64, "base64");

// if (!obj) {
//     console.log("fuck me");
//     return "<h1>Image not found</h1>";
// } else {
//     var image;

//     image = Buffer.from(obj, "base64");

//     return image;
// }

//res.end("<html><body><img src='data:image/jpg;base64," + base64 + "' alt='Red dot'></body>");


// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.end("<html><body><img src='data:image/jpg;base64," + base64 + "' alt='Red dot'></body>");
// updatePhoto();
//res.send(getLastImage());
// res.sendFile(path.join(__dirname, '../public/out.jpg'))

//var base64 = getLastImage();
module.exports = streamRouter;