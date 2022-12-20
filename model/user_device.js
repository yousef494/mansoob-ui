let util = require('../util');
//let models = require('./');


const modelName = 'user_device';

const user_deviceSchema = {
    id: {
        type: "INT(6)",
        concentrates: ['UNSIGNED', 'AUTO_INCREMENT', 'PRIMARY KEY']
    },
    user_id: {
        type: "INT(6)",
        concentrates: ['UNSIGNED']
    },
    device_id: {
        type: "INT(6)",
        concentrates: ['UNSIGNED']
    }
};


module.exports = {
    name: modelName, schema: user_deviceSchema
};
