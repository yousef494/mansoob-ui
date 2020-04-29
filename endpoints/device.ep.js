/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');
const jwt = require('jsonwebtoken');

module.exports = function (app, Mysql, urlPrefix, security) {

    const router = express.Router()

    let uriItem = `${urlPrefix}/${models.device.name}`

    let validateUserInput = function (params, data) {
        for (let i = 0; i < params.length; i++) {
            if (data[params[i]] == undefined) {
                return false;
            }
        }
        return true;
    }

    router.post(uriItem + '/token', function (req, res, next) {
        if (validateUserInput(['device_id', 'user_id'], req.body)) {
            const { device_id, user_id } = req.body;
            // gen_api_access_tocken
            try {
                const accessToken = jwt.sign({ device_id: device_id }, process.env.JWT_SECRET);
                Mysql.update(models.device.name, { id: device_id, user_id: user_id }, { access_token: accessToken })
                    .then(function (info) {
                        res.status(200).json({
                            data: { device_id: device_id, user_id: user_id },
                            accessToken
                        })
                    })
                    .catch(function (err) {
                        console.log(err);
                        return next('Error while updating the token....');
                    });

            } catch (error) {
                next(error);
            }

        } else {
            return next('Insufficient input');
        }
    });

    restify.serve(router, Mysql, models.device, { prefix: urlPrefix }, security);
    app.use(router);

};