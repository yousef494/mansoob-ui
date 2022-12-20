module.exports = {
    development: {
        server: {
            name: 'Mansoob dev.',
            host: '0.0.0.0',
            port: 2903
        },
        urlPrefix: '/api/v1',
        testingPrefix: '/testing',
        mysqlOptions: {
            host: '192.168.100.10',
            user: 'manssobdb',
            password: '1stChicken*db',
            database: 'mansoob',
            socketPath: false,
            connectionLimit: 5
        },
        uploadDir: '/Users/Yousef/Documents/myworkspace/Mansoob V2/uploads/avatars'
    },
    production: {
        server: {
            name: 'Mansoob prod.',
            host: '0.0.0.0',
            port: 3000
        },
        urlPrefix: '/api/v1',
        mysqlOptions: {
            host: '192.168.100.10',
            user: 'manssobdb',
            password: '',
            database: 'mansoob',
            port: 3306,
            socketPath: false,
            connectionLimit: 5
        },
        uploadDir: ''//'/home/fz12klftt4ot/www/uploads/avatars'
    },
    mailserver: {
        host: 'n3plcpnl0274.prod.ams3.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@mansoob.yousefcave.com',
            pass: '1stEmail*user'
        },
        from: 'Mansoob <noreply@mansoob.yousefcave.com>'
    },
    severity: {
        color: {
            Normal: "#5cb85c",
            Low: "#f0ad4e",
            Medium: "#ff8d00",
            High: "#d9534f",
            Critical: "#8b0202",
        }
    }
}