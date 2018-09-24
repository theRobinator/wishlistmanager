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

app.use('/wishlist', express.static('dist/wishlist'));
app.get(/^\/wishlist\/[^\.]+/, (req, res) => res.redirect('/wishlist'));

app.post('/api/auth/check', authMiddleware, (req, res) => { res.write('{}'); res.end(); });
app.post('/api/lists/get', authMiddleware, Endpoints.listsGet);
app.post('/api/items/add', authMiddleware, Endpoints.itemsAdd);
app.post('/api/items/delete', authMiddleware, Endpoints.itemsDelete);
app.post('/api/items/update', authMiddleware, Endpoints.itemsUpdate);

const port = 3000;

app.listen(port, () => {
	console.log('Node server listening on port ' + port);
});
