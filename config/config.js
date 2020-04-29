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
            user: 'myuser',
            password: 'chicken',
            database: 'mansoob',
            socketPath: false,
            connectionLimit: 5
        }
    },
    production: {
        server: {
            name: 'Mansoob prod.',
            host: '0.0.0.0',
            port: 3000
        },
        urlPrefix: '/api/v1',
        mysqlOptions: {
            host: 'localhost',
            user: 'manssobdb',
            password: '1stChicken*db',
            database: 'mansoob',
            socketPath: false,
            connectionLimit: 5
        }
    },
    mailserver: {
        host: 'n3plcpnl0274.prod.ams3.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@mansoob.yousefcave.com',
            pass: '1stEmail*user'
        },
        from: 'noreply@mansoob.yousefcave.com'
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