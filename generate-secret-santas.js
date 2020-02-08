"use strict";
exports.__esModule = true;
var mysql_1 = require("./server/mysql");
var year = new Date().getFullYear();
mysql_1.DB_POOL.execute('select * from secret_santas where year=?', [year - 1], function (err, results) {
    if (err) {
        throw err;
    }
    var previousSantas = {};
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var i = results_1[_i];
        previousSantas[i['email']] = i['person'];
    }
    mysql_1.DB_POOL.query('select * from users', function (err, results) {
        if (err) {
            throw err;
        }
        console.log('People are', results.map(function (i) { return i['name']; }));
        results.push(...['Matt', 'Susan', 'Ben', 'Alex'].map(i => ({email: i, name: i})));
        while (true) {
            // Shuffle
            var pool = results.slice();
            var matches = [];
            while (pool.length) {
                var index = Math.floor(Math.random() * pool.length);
                var deletedItems = pool.splice(index, 1);
                matches.push(deletedItems[0]);
            }
            console.log('Trying matches', matches);
            // Verify
            var allOK = true;
            for (var i = 0; i < results.length; ++i) {
                var myEmail = results[i]['email'];
                var match = matches[i];
                if (match['email'] === myEmail || match['name'] === previousSantas[myEmail]) {
                    allOK = false;
                    break;
                }
            }
            if (allOK) {
                for (var i = 0; i < results.length; ++i) {
                    console.log('Got match', [results[i]['email'], matches[i]['name']]);
                }
                process.exit(0)
            }
        }
    });
});
