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
        util.notifier.alert('html', 74, 'Low');
        res.end();
    });

    let validateUserInput =  function(params, data){
        for(let i=0; i<params.length;i++){
            if(data[params[i]] == undefined){
                return false;
            }
        }
        return true;
    }

    router.post(uriItem + '/process', function (req, res) {
        if (validateUserInput(['device_id', 'user_id'],req.body)) {
            //1- insert the data
            Mysql.insert(models.reading.name, {'level': req.body['level']})
            .then(function (info) {
                //res.send(req.body);
            })
            .catch(function (err) {
                console.log(err);
                //res.send(err.message);
            });
            // 2- process alert and and update notification table accordinglly
            models.device.processAlert(Mysql, req.body['level'],
                req.body['device_id'], req.body['user_id']);
        }else{
            res.send({ 'resutl': 'Error', 'messsage': 'An insufficient number of arguments were supplied' });
        }
        res.send({ 'resutl': 'Success', 'messsage': req.body });
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