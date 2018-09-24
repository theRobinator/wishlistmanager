const mysql = require('mysql2');

const SETTINGS = require('../../mysql.json');

// create the connection to database
export const DB_POOL = mysql.createPool({
	host: 'localhost',
	user: SETTINGS['user'],
	password: SETTINGS['password'],
	database: 'wishlistmanager',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});
