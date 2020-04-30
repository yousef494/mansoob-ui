
const restify = function (app, Mysql, model, options, security) {

    options.name = model.name;
    let uriItem = `${options.prefix}/${options.name}`

    //count
    app.get(uriItem + "/count", security.allowIfLoggedin, security.hasAccess('updateAny', 'profile'), function (req, res) {
        var query = 'SELECT count(*) as count FROM ' + Mysql.escapeId(options.name);
        Mysql.query(query, {})
            .then(function (count) {
                res.send(count);
            }).catch(function (err) {
                res.status(500).send(err.message);
            });
        createTable(model.name, model.schema);
    });


    //normalize timestamp
    app.get(uriItem + '/time', function (req, res) {
        var query = 'SELECT *, DATE_FORMAT(' + Mysql.escapeId('timestamp') + ' , "%Y-%m-%d %H:%i:%s") AS timestamp FROM ' + Mysql.escapeId(options.name);
        var parsed_q = parseQuery(req.query, Mysql);
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

    //get individual item
    app.get(uriItem + '/:id', security.allowIfLoggedin, security.hasAccess('updateAny', 'profile'), function (req, res) {
        Mysql.record(options.name, req.params)
            .then(function (record) {
                console.log(record);
                if (record == null) {
                    record = {};
                }
                res.send(record);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    //get full list
    app.get(uriItem, function (req, res) {
        //res.send([{ id:1, name: 'Mansoob', tank_capacity: 8, tank_height: 150, severity: 'Normal',
       // level: 10 ,email_to: 'yousef-494@hotmail.com' }]);
        var query = 'SELECT * FROM ' + Mysql.escapeId(options.name);
        var parsed_q = parseQuery(req.query, Mysql);
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

    //add item
    app.post(uriItem, function (req, res) {
        Mysql.insert(options.name, req.body)
            .then(function (info) {
                res.status(200).send(req.body);
            })
            .catch(function (err) {
                console.log(err);
                if (err.code == 'ER_NO_SUCH_TABLE') {
                    createTable(model.name, model.schema, function () {
                        Mysql.insert(options.name, req.body)
                            .then(function (info) {
                                res.status(200).send(req.body);
                            })
                            .catch(function (err) {
                                res.status(500).send(err.message);
                            });
                    });
                } else {
                    res.status(500).send(err.message);
                }
            });
    });

    //update item
    app.put(uriItem + '/:id', function (req, res) {
        Mysql.update(options.name, req.params, req.body)
            .then(function (info) {
                res.status(200).send(req.body);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    //same as put: it needs more implementation (actuall put needs more implementation to extend params)
    app.patch(uriItem + '/:id', function (req, res) {
        Mysql.update(options.name, req.params, req.body)
            .then(function (info) {
                res.status(200).send(req.body);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    //delete item
    app.delete(uriItem + '/:id', function (req, res) {
        Mysql.delete(options.name, req.params)
            .then(function (info) {
                res.status(200).send(info);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });


    //delete items
    app.delete(uriItem , function (req, res) {
        Mysql.delete(options.name, [])
            .then(function (info) {
                res.status(200).send(info);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    //create table
    var createTable = function (name, schema, next) {
        var arr = new Array();
        for (i in Object.keys(schema)) {
            let key = Object.keys(schema)[i];
            let q = key + ' ' + schema[key]['type'] + ' ';
            for (j in schema[key]['concentrates']) {
                let concentrate = schema[key]['concentrates'][j];
                q = q + concentrate + ' '
            }
            arr.push(q);
        }

        let query = 'CREATE TABLE ' + Mysql.escapeId(name) + ' (' + arr.toString() + ')';

        Mysql.query(query, {})
            .then(function (results) {
                next();
            }).catch(function (err) {
            });
    }

    return uriItem;
}

var parseQuery = function (tokens, Mysql) {
    let query = '';
    let vals = [];
    for (let i = 0; i < Object.keys(tokens).length; i++) {
        let param = Object.keys(tokens)[i];
        let value = tokens[param];
        if (param == 'limit') {//limit
            query = query + ' LIMIT ?'
            vals.push(...[+(value)]);
        } else if (param == 'sort') {//order by
            query = query + ' ORDER BY ' + Mysql.escapeId(value) + ' DESC';
        } else if (param == 'skip') {//skip
            query = query + ' LIMIT ? , 999999999';
            vals.push(...[+(value)]);
        } else if (param == 'query') {//custom query
            let obj = JSON.parse(value);
            let parsed_q = parseQuery(obj, Mysql);
            query = query + parsed_q[0];
            vals.push(...parsed_q[1]);
        } else if (param == 'head') {//select first row
            query = query + ' LIMIT 1'
        } else if (param == 'tail') {//select last inserted row
            query = query + ' ORDER BY ID DESC LIMIT 1'
        } else {
            query = query + ' WHERE ?'
            vals.push(value);
        }
        // break;
    }

    return [query, vals];
}


module.exports = {
    serve: restify,
    parseQuery: parseQuery
}
