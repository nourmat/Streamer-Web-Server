const AWS = require("aws-sdk");
const dotenv = require("dotenv").config();

//Add bucket name and configure region
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
AWS.config.update({ region: process.env.AWS_REGION });
AWS.config.apiVersion = { s3: process.env.AWS_APIVERSION };

//Used to check if credential file is loaded
AWS.config.getCredentials((err) => {
    if (err)
        console.log(err.stack); // credentials not loaded
    else
        console.log("Access key:", AWS.config.credentials.accessKeyId);
});

function getObjectAndDownload(FILE_NAME, callback) {
    //Create a service as each API operation is exposed as a function on service.
    var s3 = new AWS.S3();

    var params = {
        Key: FILE_NAME,
        Bucket: BUCKET_NAME,
        Expires: 60 * 5
    };

    const url = s3.getSignedUrl('getObject', params);
    callback(url);
}

function ListObjectsWithPrefix(PREFIX, callback) {
    //Create a service as each API operation is exposed as a function on service.
    var s3 = new AWS.S3();

    var params = {
        Bucket: BUCKET_NAME,
        Prefix: PREFIX
    };

    s3.listObjects(params, function(err, data) {
        if (err) {
            throw err;
        } else {
            callback(data);
        }
    })
}

module.exports = {
    getObjectAndDownload,
    ListObjectsWithPrefix
};

// s3.getObject(params, function(err, data) {
//     if (err) {
//         throw err
//     }

//     fs.writeFileSync('./' + FILE_NAME + '.mp4', data.Body)
//     console.log('file downloaded successfully')
// })