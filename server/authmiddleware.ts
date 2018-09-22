import * as express from 'express';
const {OAuth2Client} = require('google-auth-library');


const CLIENT_ID = '352834916195-ovmhpmlusqg6s6cmgeq0e9p1hk3fq5e5.apps.googleusercontent.com';

const allowedEmails = new Set([
	'robinthekeller@gmail.com',
	'rose.abernathy@gmail.com',
])

const authClient = new OAuth2Client(CLIENT_ID);


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
		fail(response);
		return;
	} else {
		next();
	}
}

function fail(response: express.Response) {
	response.writeHead(401);
	response.write('Unauthorized :(');
	response.end();	
}
