"use strict";
exports.__esModule = true;
var mysql = require('mysql2');
var SETTINGS = require('../mysql.json');
// create the connection to database
exports.DB_POOL = mysql.createPool({
    host: 'localhost',
    user: SETTINGS['user'],
    password: SETTINGS['password'],
    database: 'wishlistmanager',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
