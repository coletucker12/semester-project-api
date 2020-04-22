var mysql = require('mysql');
require('dotenv').config()
module.exports = {
    name: 'final-project-api',
    hostname : 'http://localhost',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    db: {
        get : mysql.createConnection({
			host     : process.env.DB_HOST || 'localhost',
			user     : 'ctucker',
			password : process.env.DB_PASS || '',
			database : 'final_project'
		})
    }
}

