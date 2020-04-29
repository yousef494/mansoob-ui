let util = require('../util');

let config = require('../config/config');

const modelName = 'device';

const deviceSchema = {
    id: {
        type: "INT(6)",
        concentrates: ['UNSIGNED', 'AUTO_INCREMENT', 'PRIMARY KEY']
    },
    name: {
        type: 'VARCHAR'
    },
    password: {
        type: 'VARCHAR'
    },
    role: {
        type: 'VARCHAR',
        concentrates: ["DEFAULT", "basic"]
    },
    accessToken: {
        type: 'VARCHAR'
    }
};


var processAlert = function (Mysql, level, device_id, user_email) {
    //get previous status
    var query = "SELECT device.tank_height, device.severity, device.normal_alert, device.low_alert, device.medium_alert, device.high_alert, device.email_to, device.user_id\
        FROM " + Mysql.escapeId('device') + " , " + Mysql.escapeId('user') + " \
        WHERE device.id = ? and device.user_id = user.id and user.email = ?";

    Mysql.query(query, [device_id, user_email])
        .then(function (results) {
            if (results.length == 1) {
                let r = results[0];
                if(r['device.email_to'] == null || r['device.email_to'].length ==0){
                    r['device.email_to'] = user_email;
                }
                updateAlert(Mysql, device_id, r['device.email_to'], level, r['device.tank_height'], r['device.severity']
                    , r['device.normal_alert'], r['device.low_alert'], r['device.medium_alert'], r['device.high_alert']);
            } else {
                return 'error';
            }
        }).catch(function (err) {
            console.log(err);
        });
}

var updateAlert = function (Mysql, device_id, email_to, level, tank_height, previous_severity,
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
            normal_alert: true,
            low_alert: true,
            medium_alert: true,
            high_alert: true,
            critical_alert: true,
            severity: "Normal"
        }
    }

    //update database
    Mysql.update(modelName, { id: device_id }, body)
        .then(function (results) {
        }).catch(function (err) {
            console.log(err);
        });

    //send alert if not normal statues
    if (message != null) {
        //send email
        util.notifier.alert(message, email_to);
        //upate notification database
        Mysql.insert('notification', {
            "subject": "Alert",
            "message": "latest level was recorded is ("+level+")",
            "urgency": (severity=='Critical'|| severity=='High'?"danger":"warning"),
            "device_id": device_id
        }).then(function (results) {
            }).catch(function (err) {
                console.log(err);
            });
    }
}

var calculateSeverity = function (level, tank_height) {
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

module.exports = {
    name: modelName, schema: deviceSchema,
    calculateSeverity: calculateSeverity,
    processAlert: processAlert
};
