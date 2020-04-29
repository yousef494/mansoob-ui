/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');
let util = require('../util');

module.exports = function (app, Mysql, urlPrefix, role) {

    const router = express.Router()
    const modelName = models.reading.name;
    let uriItem = `${urlPrefix}/${modelName}`

    // testing get /notify
    router.get(uriItem + '/notify', function (req, res) {
        let message = { level: 110, severity: 'Normal', color: "#5cb85c" };

        util.notifier.alert(message, 'yousef-494@hotmail.com');
        res.end();
    });

    router.get(uriItem + '/consumption', function (req, res) {
        var query = "SELECT DATE_FORMAT(" + Mysql.escapeId('timestamp') + " , '%Y-%m-%d') AS day ,\
        CASE WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '00:00:00' AND '06:00:00' THEN 1\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '06:00:01' AND '12:00:00' THEN 2\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '12:00:01' AND '18:00:00' THEN 3\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '18:00:01' AND '24:59:59' THEN 4\
        END as quarter, COUNT(*) as count, MAX(level) - MIN(level) as consumption\
        FROM " + Mysql.escapeId(modelName) + "\
        GROUP BY DATE(" + Mysql.escapeId('timestamp') + "),\
        CASE WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '00:00:00' AND '06:00:00' THEN 1\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '06:00:01' AND '12:00:00' THEN 2\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '12:00:01' AND '18:00:00' THEN 3\
             WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '18:00:01' AND '24:59:59' THEN 4\
        END ORDER BY " + Mysql.escapeId('timestamp') + " DESC";
        var parsed_q = restify.parseQuery(req.query, Mysql);
        query = query + parsed_q[0];
        req.query = parsed_q[1];
        Mysql.query(query, req.query)
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

    restify.serve(router, Mysql, models.reading, { prefix: urlPrefix }, role);
    app.use(router);

};