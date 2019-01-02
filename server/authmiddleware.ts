import * as express from 'express';
const {OAuth2Client} = require('google-auth-library');

import {DB_POOL} from './mysql';


const CLIENT_ID = '352834916195-ovmhpmlusqg6s6cmgeq0e9p1hk3fq5e5.apps.googleusercontent.com';
const authClient = new OAuth2Client(CLIENT_ID);


// Grab all the allowed emails from the DB on startup
// This doesn't block so all auth calls made before this query returns will fail!
const allowedEmails = new Set([]);
DB_POOL.query('SELECT * FROM users', (err, results, fields) => {
	if (err) {
		console.error(err);
		return;
	}
	for (const row of results) {
		allowedEmails.add(row['email']);
	}
});

/**
 * Middleware function that validates an auth token, passed in the `google-token` POST param, with the Google API.
 */
export async function authMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
	const token = request.body['google-token'];
	if (!token) {
		fail(response);
		return;
	}

	let ticket;
	try {
		// This verify call only verifies that the token is a real token, not that it belongs to one of our users
		ticket = await authClient.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		});
	} catch (err) {
		console.error(err);
		fail(response);
		return;
	}

	// Make sure that the token belongs to one of our users
	const payload = ticket.getPayload();
	const userEmail = payload['email'];
	if (!allowedEmails.has(userEmail)) {
		fail(response, `This Google account (${userEmail}) is not authorized to use this app. Please choose another or complain to Robin.`);
		return;
	} else {
		request['authedUserEmail'] = userEmail;
		next();
	}
}


/**
 * Utility function for returning an error in a readable format
 */
function fail(response: express.Response, message: string = 'Unauthorized') {
	response.writeHead(401, {'Content-Type': 'application/json'});
	response.write(`{"message": "${message}"}`);
	response.end();	
}
