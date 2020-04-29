/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');

module.exports = function(app, Mysql, urlPrefix, security){

    const router = express.Router()
    const modelName = models.noti.name;
    let uriItem = `${urlPrefix}/${modelName}`

    router.get(uriItem+'/user',  function (req, res) {
        var query = "SELECT d.name as device, u.name as user, n.subject, n.message, n.urgency, DATE_FORMAT(" + Mysql.escapeId('n.timestamp') +" , '%Y-%m-%d') AS day\
        FROM notification n, user u, device d \
        WHERE n.device_id = d.id and d.user_id = u.id and u.id= ? ORDER BY " + Mysql.escapeId('timestamp') +" DESC";
        
        Mysql.query(query, [req.query['id']])
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

    restify.serve(router, Mysql, models.noti, {prefix: urlPrefix}, security);
    app.use(router);

};