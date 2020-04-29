let util = require('../util');
let models = require('./');


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




module.exports = {
    name: modelName, schema: deviceSchema
};
