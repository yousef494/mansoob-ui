
/**
 * This acts as the controller
 */
var express = require('express');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sharp = require("sharp");
const config = require('../config/config');

const path = require("path");

module.exports = function (app, Mysql, urlPrefix, security) {

    const router = express.Router()
    let uriItem = `${urlPrefix}/upload`

    var env = process.env.NODE_ENV || 'development';
    let dest = config[env].uploadDir;


    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    const upload = multer({
        storage: multerStorage,
        fileFilter: multerFilter
    }).single('file');

    //   const uploadFiles = upload.array("images", 10);

    const uploadImages = (req, res, next) => {
        upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    return res.send({ 'resutl': 'Error', 'messsage': "Too many files to upload."});
                }
            } else if (err) {
                return res.send(err);
            }
            next();
        });
    };


    const resizeImages = async (req, res, next) => {
        if (!req.file) return next();
        const newFilename = req.params.user_id + '-avatar.png';

        req.files = [];
        req.files.push(req.file);
        req.body.images = [];
        await Promise.all(
            req.files.map(async file => {
                await sharp(file.buffer)
                    .resize(200, 200)
                    .toFormat("png")
                    .jpeg({ quality: 90 })
                    .toFile(`${dest}/${newFilename}`);

                req.body.images.push(newFilename);
            })
        );
        next();
    };

    const getResult = async (req, res) => {
        if (req.body.images.length <= 0) {
            res.send({ 'resutl': 'Error', 'messsage': "You must select at least 1 image."});
            return res.end();
        }

       /* const images =  req.body.images
          .map(image => "" + image + "")
          .join("");*/
      
        res.send({ 'resutl': 'Success', 'messsage': "File is uploaded"});
        res.end();
    };

    router.post(uriItem + '/avatar/:user_id', uploadImages, resizeImages, getResult);

    app.use(router);

};