import * as express from 'express';
import * as bodyParser from 'body-parser';

import {authMiddleware} from './authmiddleware';

const app = express();

process.on('uncaughtException', err => {
	console.error(err);
});
process.on('unhandledRejection', reason => {
	console.error(reason);
})

app.use(bodyParser.urlencoded({extended: false}));

app.get('/lists/get', authMiddleware, (req, res) => {
	res.writeHead(200);
	res.write('Auth success!');
	res.end();
});

app.listen(3000, () => {
	console.log('Node server listening on port 3000');
});
