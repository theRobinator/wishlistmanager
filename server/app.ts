import * as express from 'express';
import * as bodyParser from 'body-parser';

import {authMiddleware} from './authmiddleware';
import * as Endpoints from './endpoints';

const app = express();

process.on('uncaughtException', err => {
	console.error(err);
});
process.on('unhandledRejection', reason => {
	console.error(reason);
})

app.use(bodyParser.json());

app.post('/auth/check', authMiddleware, (req, res) => { res.write('{}'); res.end(); });
app.post('/lists/get', authMiddleware, Endpoints.listsGet);
app.post('/items/add', authMiddleware, Endpoints.itemsAdd);
app.post('/items/delete', authMiddleware, Endpoints.itemsDelete);
app.post('/items/update', authMiddleware, Endpoints.itemsUpdate);

app.listen(3000, () => {
	console.log('Node server listening on port 3000');
});
