const mysql = require('mysql2');

// create the connection to database
export const DB_POOL = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'rootroot',
	database: 'wishlistmanager',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});
