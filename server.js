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
const role = require('./controller/role.ctr');

const endpoints = require('./endpoints');
const config = require('./config/config');

const app = express();
app.use(bodyParser.json()); // Send JSON responses
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(methodOverride())

var env = process.env.NODE_ENV || 'development';
Mysql.connect(config[env].mysqlOptions);

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        try {
            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
            // Check if token has expired
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
            }
            Mysql.record('user', { id: userId })
                .then(function (user) {
                    if (!user) { return next('User does not exist'); }
                    res.locals.loggedInUser = user;
                    next();
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


endpoints.reading(app, Mysql, config[env].urlPrefix, role);
endpoints.device(app, Mysql, config[env].urlPrefix, role);
endpoints.noti(app, Mysql, config[env].urlPrefix, role);
endpoints.auth(app, Mysql, config[env].urlPrefix, role);

//app.listen(config[env].server.port, config[env].server.host, function () {

app.listen(config[env].server.port, function () {
    console.log(config[env].server.name, 'server is listening on port', config[env].server.port);
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.get('*',express.static(distDir));

app.use(function (req, res) {
    res.status(404).send('Invalid endpoint!');
});