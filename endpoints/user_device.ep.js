/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');
const jwt = require('jsonwebtoken');

module.exports = function (app, Mysql, urlPrefix, security) {

    const router = express.Router()
    let uriItem = `${urlPrefix}/${models.user_device.name}`

    restify.serve(router, Mysql, models.user_device, { prefix: urlPrefix }, security);
    app.use(router);

};