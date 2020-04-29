var nodemailer = require("nodemailer");
var ejs = require('ejs');
var fs = require('fs');
const config = require('../config/config');

var alert = function (data, to) {

    var template = fs.readFileSync('./resources/emailTemps/alert.html',{encoding:'utf-8'});
    var html = ejs.render(template, data);


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
            to: to.toString(),
            subject: 'Mansoob Status Alarm',
            text: 'Please notice that the severity level of the tank reaches the \
            '+ data['severity'] +' state ('+data['severity']+')',
            html: html
        }
    };

    const sendMail = async ({ mailserver, mail }) => {
        // create a nodemailer transporter using smtp
        let transporter = nodemailer.createTransport(mailserver);

        // send mail using transporter
        let info = await transporter.sendMail(mail);

        console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
    };

    sendMail(mailConfig).catch(console.error);
    console.log('email sent...');

};


module.exports = {
    alert: alert
};
