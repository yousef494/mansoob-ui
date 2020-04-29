/**
 * This acts as the controller
 */
var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify');
let util = require('../util');

module.exports = function (app, Mysql, urlPrefix, role) {

    const router = express.Router()
    let endpointName = 'process';
    let uriItem = `${urlPrefix}/${endpointName}`
    const isLog = true;

    let validateUserInput = function (params, data) {
        for (let i = 0; i < params.length; i++) {
            if (data[params[i]] == undefined) {
                return false;
            }
        }
        return true;
    }

    /**
     * Queries joint table (device and user)
     * validates identity
     * Triggers for storing the data
     * @param {*} req 
     * @param {*} res 
     */
    let process = function (req, res) {
        // Make sure device_id, user_email are matching 
        // get previous status
        var query = "SELECT device.tank_height, device.severity, device.email_to, device.user_id, \
                            device.normal_alert, device.low_alert, device.medium_alert, device.high_alert,\
                    FROM " + Mysql.escapeId('device') + " , " + Mysql.escapeId('user') + "  \
                    WHERE device.user_id = user.id \
                    and device.id = ? \
                    and user.email = ? ";
        Mysql.query(query, [req.body['device_id'], req.body['user_email']])
            .then(function (results) {
                log('info', 'process', results);
                if (results.length == 1) {
                    updateReading(req.body['timestamp'], req.body['level'], results[0]);
                } else {
                   res.send('Invalid input');
                }
            }).catch(function (err) {
                log('err', 'process', err);
            });
    }

    /**
     * Updates reading table
     * Trigers for processing the data
     * @param {*} timestamp 
     * @param {*} level 
     * @param {*} d_info 
     */
    let updateReading = function (timestamp, level, d_info) {
        // Insert the data into reading table
        let data = { 'timestamp': timestamp, 'level': level };
        Mysql.insert(models.reading.name, data)
            .then(function (info) {
                log('info', 'reading', info);
            })
            .catch(function (err) {
                log('err', 'reading', err);
            });

        processAlert(d_info['device_id'], d_info['email_to'], level, d_info['tank_height'], d_info['severity']
            , d_info['normal_alert'], d_info['low_alert'], d_info['medium_alert'], d_info['high_alert']);
    }

    /**
     * Calculates severity
     * update device table
     * updtes notification table
     * send alert
     */
    let processAlert = function (device_id, email_to, level, tank_height, previous_severity,
        normal_alert, low_alert, medium_alert, high_alert) {
        let current_severity = calculateSeverity(level, tank_height);

        let normal_min = (tank_height * 0.5);
        let message = null;
        if (current_severity == "Low" & previous_severity == "Normal" & normal_alert) {
            message = { level: level, severity: current_severity, color: config.severity.color[current_severity] };
            normal_alert = false
        }
        if (current_severity == "Medium" & previous_severity == "Low" & low_alert) {
            message = { level: level, severity: current_severity, color: config.severity.color[current_severity] };
            low_alert = false
        }
        if (current_severity == "High" & previous_severity == "Medium" & medium_alert) {
            message = { level: level, severity: current_severity, color: config.severity.color[current_severity] };
            medium_alert = false
        }
        if (current_severity == "Critical" & previous_severity == "High" & high_alert) {
            message = { level: level, severity: current_severity, color: config.severity.color[current_severity] };
            high_alert = false
        }


        let body = {
            normal_alert: normal_alert,
            low_alert: low_alert,
            medium_alert: medium_alert,
            high_alert: high_alert,
            severity: current_severity
        }
        if (((level - normal_min) / normal_min).toFixed(2) > 0.04) {
            body = {
                leve: level,
                normal_alert: true,
                low_alert: true,
                medium_alert: true,
                high_alert: true,
                critical_alert: true,
                severity: "Normal"
            }
        }

        //update device table
        Mysql.update(models.device.name, { id: device_id }, body)
            .then(function (results) {
                log('info', 'processAlert1', results);
            }).catch(function (err) {
                log('err', 'processAlert1', err);
            });

        //send alert if not normal statues
        if (message != null) {
            //send email
            util.notifier.alert(message, email_to);
            //upate notification database
            Mysql.insert(models.noti.name, {
                "subject": "Alert",
                "message": "latest level was recorded is (" + level + ")",
                "urgency": (severity == 'Critical' || severity == 'High' ? "danger" : "warning"),
                "device_id": device_id
            }).then(function (results) {
                log('info', 'processAlert2', results);
            }).catch(function (err) {
                log('err', 'processAlert2', err);
            });
        }
    }

    let calculateSeverity = function (level, tank_height) {
        let = severity = "Normal";
        if (level < (tank_height * 0.17)) {
            severity = "Critical";
        } else if (level < (tank_height * 0.25)) {
            severity = "High";
        } else if (level < (tank_height * 0.33)) {
            severity = "Medium"
        } else if (level < (tank_height * 0.50)) {
            severity = "Low";
        } else if (level > (tank_height * 0.50)) {
            severity = "Normal";
        }
        return severity
    };


    let log = function(type, func, message){
        if(isLog){
            let data = `${type}:${func}:${message}`
            console.log(data)
        }
    }


    router.post(uriItem, function (req, res) {
        if (validateUserInput(['level', 'timestamp', 'device_id', 'user_email'], req.body)) {
            process(req, res);
        } else {
            res.send({ 'resutl': 'Error', 'messsage': 'An insufficient number of arguments were supplied' });
        }
        res.send({ 'resutl': 'Success', 'messsage': req.body });
    });


    restify.serve(router, Mysql, models.reading, { prefix: urlPrefix }, role);
    app.use(router);

};