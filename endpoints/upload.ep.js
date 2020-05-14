
/**
 * This acts as the controller
 */
var express = require('express');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const config = require('../config/config');

const path = require("path");

module.exports = function (app, Mysql, urlPrefix, security) {

    const router = express.Router()
    let uriItem = `${urlPrefix}/upload`

    var env = process.env.NODE_ENV || 'development';
    let dest = config[env].uploadDir;


    const imageFilter = function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    var storage = multer.diskStorage({
        destination: dest,
        filename: function (req, file, callback) {
            callback(null, req.params.user_id + '-avatar.png');
        }
    });

    var upload = multer({ storage: storage, fileFilter: imageFilter }).single("file");

    router.post(uriItem + '/avatar/:user_id', function (req, res) {
        upload(req, res, function (err) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            res.send({ 'resutl': 'Success', 'messsage': "File is uploaded"});
        });
    });

    app.use(router);

};