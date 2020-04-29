/**
 * This file establishes the app.
 * Register endpoints.
 * 
 * 
 * Run:
 * npm run build
 */
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var Mysql = require('node-mysql-helper');

const jwt = require('jsonwebtoken');
const security = require('./controller/role.ctr');

const endpoints = require('./endpoints');
const config = require('./config/config');

const app = express();
app.use(bodyParser.json()); // Send JSON responses
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(methodOverride())

var env = process.env.NODE_ENV || 'development';
Mysql.connect(config[env].mysqlOptions);

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"] || req.headers["x-access-token-api"] ) {
        let accessToken = req.headers["x-access-token"];
        if(req.headers["x-access-token-api"]){
            accessToken = req.headers["x-access-token-api"];
        }
        try {
            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
            // Check expiration in case of x-access-token (from web not IOT)
            if (exp < Date.now().valueOf() / 1000 && req.headers["x-access-token"]) {
                return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
            }
            Mysql.record('user', { id: userId })
                .then(function (user) {
                    if (!user) { return next('User does not exist'); }
                    // Check device token == given accessToken
                    if(req.headers["x-access-token-api"]){
                        let device_id = req.headers["device_id"];
                        console.log("device_id");
                        console.log(device_id);
                        console.log(accessToken);
                        console.log("device_id");
                        Mysql.record('device', { user_id: userId, id: device_id })
                        .then(function (device) {
                            if (!device) { return next('Device does not exist'); }
                            if(device['access_token'] != accessToken){ return next('Invalid token'); }
                            res.locals.loggedInUser = user;
                            next();
                        })
                        .catch(function (err) {
                            return res.status(401).json({ error: "Invalid token" });
                        });
                    }else{
                        res.locals.loggedInUser = user;
                        next();
                    }
                })
                .catch(function (err) {
                    return res.status(401).json({ error: "User does not exist" });
                });
        } catch (error) {
            return res.status(401).json({ error: error.message });
          //  return res.status(401).json({ error: "Invalid token" });
        }
    } else {
        next();
        //this secures whole app (token is a most)
        //return res.status(401).json({ error: "You are not authorized" });
    }
});


endpoints.reading(app, Mysql, config[env].urlPrefix, security);
endpoints.device(app, Mysql, config[env].urlPrefix, security);
endpoints.noti(app, Mysql, config[env].urlPrefix, security);
endpoints.auth(app, Mysql, config[env].urlPrefix, security);
endpoints.process(app, Mysql, config[env].urlPrefix, security);

//app.listen(config[env].server.port, config[env].server.host, function () {

app.listen(config[env].server.port, function () {
    console.log(config[env].server.name, 'server is listening on port', config[env].server.port);
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.get('*',express.static(distDir));

//redirect to home page (as an error)
app.use(function (req, res) {
    res.sendFile(distDir+'index.html');
});