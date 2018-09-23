import * as express from 'express';
const {OAuth2Client} = require('google-auth-library');

import {DB_POOL} from './mysql';


const CLIENT_ID = '352834916195-ovmhpmlusqg6s6cmgeq0e9p1hk3fq5e5.apps.googleusercontent.com';
const authClient = new OAuth2Client(CLIENT_ID);


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


export async function authMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
	const token = request.body['google-token'];
	if (!token) {
		fail(response);
		return;
	}

	let ticket;
	try {
		ticket = await authClient.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		});
	} catch (err) {
		console.error(err);
		fail(response);
		return;
	}

	const payload = ticket.getPayload();
	const userEmail = payload['email'];
	if (!allowedEmails.has(userEmail)) {
		fail(response, "This Google account is not authorized to use this app. Please choose another or complain to Robin.");
		return;
	} else {
		request['authedUserEmail'] = userEmail;
		next();
	}
}


function fail(response: express.Response, message: string = 'Unauthorized') {
	response.writeHead(401);
	response.write(`{"message": "${message}"}`);
	response.end();	
}
