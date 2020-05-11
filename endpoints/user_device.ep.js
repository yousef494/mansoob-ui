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

    router.get(uriItem+'/shares/:device_id',  function (req, res) {
        var query = "SELECT ud.id, ud.device_id, ud.user_id, u.email\
        FROM user u, user_device ud \
        WHERE ud.user_id = u.id and ud.device_id= ?";
        
        Mysql.query(query, [req.params['device_id']])
            .then(function (results) {
                if (results.length == 0)
                    records = [];
                else
                    records = results;
                res.send(records);
            }).catch(function (err) {
                res.status(500).send(err.message);
            });
    });


    router.post(uriItem+'/shares',  function (req, res) {
        var query = "INSERT INTO `user_device`(`device_id`, `user_id`)\
                     VALUES (? , (\
                        SELECT `id` FROM `user` WHERE `email` = ?))";
                        console.log(query);
                        console.log(req.body);

        Mysql.query(query, [req.body['device_id'],req.body['email']])
            .then(function (results) {
                console.log(results);

                if (results.length == 0)
                    records = [];
                else
                    records = results;
                res.send(records);
            }).catch(function (err) {
                console.log(err.message);

                res.status(500).send(err.message);
            });
    });

    restify.serve(router, Mysql, models.user_device, { prefix: urlPrefix }, security);
    app.use(router);

};