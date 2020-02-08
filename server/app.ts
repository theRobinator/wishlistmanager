import * as express from 'express';
import * as bodyParser from 'body-parser';

import {authMiddleware} from './authmiddleware';
import * as Endpoints from './endpoints';

/**
 * Entry point file for the back end server that hosts the API.
 * All API endpoints are registered to paths here.
 */

const app = express();

// Handle exceptions gracefully
process.on('uncaughtException', err => {
	console.error(err);
});
process.on('unhandledRejection', reason => {
	console.error(reason);
})

// Support reading POST requests
app.use(bodyParser.json());

// Serve all paths under /wishlist directly from the dist/ folder
app.use('/wishlist', express.static('dist/wishlist'));
app.get(/^\/wishlist\/[^\.]+/, (req, res) => res.redirect('/wishlist'));

// API endpoints, all using the authMiddleware to make sure auth happens before anything
app.post('/api/auth/check', authMiddleware, (req, res) => { res.write('{}'); res.end(); });
app.post('/api/lists/get', authMiddleware, Endpoints.listsGet);
app.post('/api/items/add', authMiddleware, Endpoints.itemsAdd);
app.post('/api/items/delete', authMiddleware, Endpoints.itemsDelete);
app.post('/api/items/update', authMiddleware, Endpoints.itemsUpdate);
app.post('/api/secretsanta/get', authMiddleware, Endpoints.secretSantaGet);

// Start listening for incoming connections
const port = 3000;
app.listen(port, () => {
	console.log('Node server listening on port ' + port);
});
