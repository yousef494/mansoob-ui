var nodemailer = require("nodemailer");
var ejs = require('ejs');
var fs = require('fs');

var alert = function (data) {

    var template = fs.readFileSync('./resources/emailTemps/alert.html',{encoding:'utf-8'});
    var html = ejs.render(template, data);

    const config = {
        mailserver: {
            host: 'smtp.live.com',
            port: 25,
            secure: false,
            auth: {
                user: 'yousef-494@hotmail.com',
                pass: "a6482@Hotmail1"
            }
        },
        mail: {
            from: 'yousef-494@hotmail.com',
            to: 'yousef-494@hotmail.com',
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

    sendMail(config).catch(console.error);
    console.log('email sent...');

};


module.exports = {
    alert: alert
};
