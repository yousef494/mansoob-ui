var nodemailer = require("nodemailer");
var ejs = require('ejs');
var fs = require('fs');
const config = require('../config/config');

var alert = function (data, to) {
    data['subject'] = 'Mansoob Status Alarm';
    data ['text'] = 'Please notice that the severity level of the tank reaches the \
    '+ data['severity'] + ' state (' + data['level'] + ')';

    var template = fs.readFileSync('./resources/emailTemps/alert.html', { encoding: 'utf-8' });
    var html = ejs.render(template, data);

    processEmail(data['subject'] , data['text'], html, to );
};

var report = function (data, to) {
    data['subject'] = 'Mansoob Summary Report';
    data ['text'] = 'Please notice that the latest level was recorded is (' + data['level'] + ').\
    Action may required to avoid outage in the water service.';

    var template = fs.readFileSync('./resources/emailTemps/report.html', { encoding: 'utf-8' });
    var html = ejs.render(template, data);

    processEmail(data['subject'] , data['text'], html, to );
};

var processEmail = function (subject, text, html, to) {


    const mailConfig = {
        mailserver: {
            host: config.mailserver.host,
            port: config.mailserver.port,
            secure: config.mailserver.secure,
            auth: {
                user: config.mailserver.auth.user,
                pass: config.mailserver.auth.pass
            }
        },
        mail: {
            from: config.mailserver.from,
            to: to,
            subject: subject,
            text: text,
            html: html
        }
    };

    const sendMail = async ({ mailserver, mail }) => {
        // create a nodemailer transporter using smtp
        let transporter = nodemailer.createTransport(mailserver);
        // send mail using transporter
        let info = await transporter.sendMail(mail);
        //console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
    };

    sendMail(mailConfig).catch(console.error);
    //console.log('email sent...');
};


module.exports = {
    alert: alert,
    report: report
};
