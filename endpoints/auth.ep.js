var express = require('express');
let models = require('../model');
const restify = require('./mysql-restify')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


module.exports = function (app, Mysql, urlPrefix, r) {

    const router = express.Router()
    const modelName = models.user.name;
    let uriItem = `${urlPrefix}/${modelName}`

    var hashPassword = async function (password) {
        return await bcrypt.hashSync(password, 10, null);
    }

    var validatePassword = async function (plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    //signup
    var signup = async (req, res, next) => {
        try {
            const { email, name, password } = req.body;
            Mysql.record(models.user.name, { email: email })
                .then(async function (record) {
                    console.log(record);
                    if (record != null) {
                        console.log(record);
                        res.json({
                            status: "Error",
                            message: "Email already exist"
                        });
                        res.end();
                    } else {
                        const hashedPassword = await hashPassword(password);
                        const newUser = { email, password: hashedPassword, name: name, role: "basic" };
                        const accessToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
                            expiresIn: "1d"
                        });
                        newUser.accessToken = accessToken;

                        Mysql.insert(models.user.name, newUser)
                            .then(function (info) {
                                res.json({
                                    status: 'Success',
                                    data: newUser,
                                    message: "You have signed up successfully"
                                });
                            })
                            .catch(function (err) {
                                console.log(err);
                                res.status(500).send(err.message);

                            });
                    }
                });


        } catch (error) {
            next(error)
        }
    }

    //login
    var login = async (req, res, next) => {
        try {

            const { email, password } = req.body;
            if (!email || !password) {
                return next('Insufficient input');
            }
            Mysql.record(models.user.name, { email: email })
                .then(async function (user) {
                    const validPassword = await validatePassword(password, user.password);
                    if (!validPassword) return next('Password is not correct');
                    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                        expiresIn: "1d"
                    });
                    Mysql.update(models.user.name, { id: user.id }, { accessToken: accessToken })
                        .then(function (info) {
                            res.status(200).json({
                                data: { email: user.email, role: user.role, id: user.id, name: user.name },
                                accessToken
                            })
                        })
                        .catch(function (err) {
                            return next('Error while updating the token....');
                        });


                })
                .catch(function (err) {
                    return next('Email does not exist');
                });

        } catch (error) {
            next(error);
        }
    }


    // update user
    var updateUser = async (req, res, next) => {
        try {
            const { role } = req.body
            const userId = req.params.id;

            Mysql.update(models.user.name, { id: userId }, { role: role })
                .then(function (info) {
                    Mysql.record(uriItem, { id: userId })
                        .then(function (user) {
                            if (!user) { return next('User does not exist'); }
                            res.status(200).json({
                                data: user
                            });
                        })
                        .catch(function (err) {
                            return next('User does not exist');
                        });
                })
                .catch(function (err) {
                    return next('Error while updating the token....');
                });

        } catch (error) {
            next(error)
        }
    }

    //delete user
    var deleteUser = async (req, res, next) => {
        try {
            const userId = req.params.id;
            Mysql.delete(models.user.name, { id: userId })
                .then(function (info) {
                    res.status(200).json({
                        data: null,
                        message: 'User has been deleted'
                    });
                })
                .catch(function (err) {
                    next(error);
                });

        } catch (error) {
            next(error)
        }
    }


    router.post(urlPrefix + '/signup', signup);
    router.post(urlPrefix + '/login', login);
    router.patch(urlPrefix + '/user/:id', updateUser);

    restify.serve(router, Mysql, models.user, { prefix: urlPrefix }, r);
    app.use(router);

};