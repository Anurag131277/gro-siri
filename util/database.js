const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'gro-siri',
	password: 'anurag'
});

module.exports = pool.promise();
