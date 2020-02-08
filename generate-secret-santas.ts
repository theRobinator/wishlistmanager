import {DB_POOL} from './server/mysql';

const year = new Date().getFullYear();
DB_POOL.execute('select * from secret_santas where year=?', [year - 1], (err, results) => {
    if (err) { throw err; }
    const previousSantas = {};
    for (const i of results) {
        previousSantas[i['email']] = i['person'];
    }
    DB_POOL.query('select * from users', (err, results) => {
        if (err) { throw err; }

        console.log('People are', results.map(i => i['name']))

        while (true) {
            // Shuffle
            const pool = results.slice();
            const matches = [];
            while (pool.length) {
                const index = Math.floor(Math.random() * pool.length);
                const deletedItems = pool.splice(index, 1);
                matches.push(deletedItems[0]);
            }
            console.log('Trying matches', matches);

            // Verify
            let allOK = true;
            for (let i = 0; i < results.length; ++i) {
                const myEmail = results[i]['email'];
                const match = matches[i];
                if (match['email'] === myEmail || match['name'] === previousSantas[myEmail]) {
                    allOK = false;
                    break;
                }
            }
            if (allOK) {
                for (let i = 0; i < results.length; ++i) {
                    console.log('Got match', [results[i]['email'], matches[i]['name']]);
                }
                DB_POOL.close();
                break;
            }
        }
    });
})
