/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');
let util = require('../util');

module.exports = function (app, Mysql, urlPrefix, security) {

    const router = express.Router()
    const modelName = models.reading.name;
    let uriItem = `${urlPrefix}/${modelName}`

    let validateUserInput = function (params, data) {
        for (let i = 0; i < params.length; i++) {
            if (data[params[i]] == undefined) {
                return false;
            }
        }
        return true;
    }

    // testing get /notify
    router.get(uriItem + '/notify', function (req, res) {
        let message = { level: 110, severity: 'Normal', color: "#5cb85c" };

        util.notifier.alert(message, 'yousef-494@hotmail.com');
        res.end();
    });


    //normalize timestamp
    app.get(uriItem + '/time', function (req, res) {
        var query = 'SELECT *, DATE_FORMAT(' + Mysql.escapeId('timestamp') + ' , "%Y-%m-%d %H:%i:%s") AS timestamp FROM ' + Mysql.escapeId(modelName);
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

    let getConsumption = function (req, rest, next) {

    }

    router.get(uriItem + '/consumption', function (req, res, next) {
        if (validateUserInput(['device_id', 'limit'], req.query)) {
            var query = "SELECT TIMESTAMP as first_timestamp, level as first_level,\
            COUNT(*) as count, Min(level) as min, Max(level) as max,\
           DATE_FORMAT(" + Mysql.escapeId('timestamp') + " , '%Y-%m-%d') AS day ,\
            CASE WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '00:00:00' AND '05:59:59' THEN 1\
                WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '06:00:00' AND '11:59:59' THEN 2\
                 WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '12:00:00' AND '17:59:59' THEN 3\
                 WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '18:00:00' AND '23:59:59' THEN 4\
                 END as quarter, \
            CASE WHEN (level - MIN(level)) < 0 THEN 0\
                 WHEN (level - MIN(level)) >= 0 THEN (level - MIN(level))\
                 END as consumption\
            FROM " + Mysql.escapeId(modelName) + "\
            WHERE device_id = ? \
            GROUP BY DATE(" + Mysql.escapeId('timestamp') + "),\
            CASE WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '00:00:00' AND '05:59:59' THEN 1\
                    WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '06:00:00' AND '11:59:59' THEN 2\
                    WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '12:00:00' AND '17:59:59' THEN 3\
                    WHEN TIME(" + Mysql.escapeId('timestamp') + ") BETWEEN '18:00:00' AND '23:59:59' THEN 4\
            END ORDER BY " + Mysql.escapeId('timestamp') + " DESC LIMIT ? ";

            Mysql.query(query, [ +req.query['device_id'] , +req.query['limit'] ])
                .then(function (results) {
                    if (results.length == 0)
                        records = [];
                    else
                        records = results;
                    //reset consumption as 0 in case of refilling per quarter
                    for (let i = 0; i < records.length; i++) {
                        if (records[i]['first_level'] < records[i]['min']) {
                            records[i]['consumption'] = 0;
                        }
                    }
                    res.send(records);
                }).catch(function (err) {
                    res.status(500).send(err.message);
                });
        } else {
            res.send({ 'resutl': 'Error', 'messsage': 'An insufficient number of arguments were supplied' });
        }
    });

    restify.serve(router, Mysql, models.reading, { prefix: urlPrefix }, security);
    app.use(router);

};