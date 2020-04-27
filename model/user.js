
const userSchema = {
    id: {
        type: "INT(6)",
        concentrates: ['UNSIGNED', 'AUTO_INCREMENT', 'PRIMARY KEY']
    },
    name: {
        type: 'VARCHAR'
    },
    email: {
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

module.exports = { name: 'user', schema: userSchema };
