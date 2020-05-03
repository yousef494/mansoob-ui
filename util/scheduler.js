let schedule = require('node-schedule');
let notifier = require('./notifier');


var jobScheduler = function (Mysql) {
    schedule.scheduleJob('1 9,21 * * *', function () {
        var query = "SELECT d.severity, d.level, d.email_to \
                    FROM " + Mysql.escapeId('device') + " d ";
        Mysql.query(query, [])
            .then(function (results) {
                if (results.length > 0) {
                    for (let i = 0; i < results.length; i++) {
                        notifier.report(results[i], results[i]['email_to']);
                    }
                }
            }).catch(function (err) {
                console.log('error: '+ err);
            });
    });
}


module.exports = {
    scheduleReports: jobScheduler
};