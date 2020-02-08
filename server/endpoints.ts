import * as express from 'express';

import {DB_POOL} from './mysql';


function writeSuccess(response: express.Response, data: any) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(data));
	response.end();
}

function writeError(response: express.Response, status: number, error: string) {
	response.writeHead(status, {"Content-Type": "application/json"});
	response.write(`{"message": "${error}"}`);
	response.end();
}


/**
 * Fetch all the lists available to the current user.
 */
export function listsGet(request: express.Request, response: express.Response) {
	DB_POOL.query('SELECT i.id, u.email, u.name, i.description, i.buyerComments FROM items i INNER JOIN users u ON i.ownerEmail=u.email', (err, results, fields) => {
		if (err) {
			console.error(err);
			writeError(response, 500, "Failed to read from the database");
			return;
		}

		// Separate items by owner
		const lists: Dictionary<object> = {};
		for (const textRow of results) {
			const email = textRow['email'];
			if (!lists[email]) {
				lists[email] = {
					'ownerEmail': email,
					'ownerName': textRow['name'],
					'items': [],
				};
			}

			const newItem = {
				'id': textRow['id'],
				'ownerEmail': email,
				'description': textRow['description'],
			}

			if (email !== request['authedUserEmail']) {
				newItem['buyerComments'] = textRow['buyerComments'] || '';
			}
			lists[email]['items'].push(newItem);
		}

		writeSuccess(response, lists);
	});
}


/**
 * Add an item to your own list.
 */
export function itemsAdd(request: express.Request, response: express.Response) {
	const description = request.body['description'];
	if (!description || typeof description != 'string' || description.length > 1024) {
		writeError(response, 400, "Missing or invalid 'description' supplied");
		return;
	}

	DB_POOL.execute('INSERT INTO items (ownerEmail, description) VALUES (?, ?)', [request['authedUserEmail'], description], 
		(err, results, fields) => {
			if (err) {
				console.error(err);
				writeError(response, 500, "Failed to read from the database");
				return;
			}
			writeSuccess(response, {
				'id': results['insertId'],
				'ownerEmail': request['authedUserEmail'],
				'description': description,
			});
		}
	);
}


/**
 * Delete a single item from your own list.
 */
export function itemsDelete(request: express.Request, response: express.Response) {
	const id = request.body['id'];
	if (!id || typeof id != 'number' || id <= 0) {
		writeError(response, 400, "Missing or invalid 'id' supplied");
		return;
	}

	DB_POOL.execute('SELECT * FROM items WHERE id=? AND ownerEmail=?', [id, request['authedUserEmail']],
		(err, results, fields) => {
			if (err) {
				console.error(err);
				writeError(response, 500, "Failed to read from the database");
				return;
			} else if (results.length === 0) {
				writeError(response, 400, "The requested item could not be found");
				return;
			}
			DB_POOL.execute('DELETE FROM items WHERE id=?', [id], (err, results, fields) => {
				if (err) {
					console.error(err);
					writeError(response, 500, "Failed to delete from the database");
					return;
				}
				writeSuccess(response, 'Item successfully deleted');
			});
		}
	);
}


/**
 * Update an item in any list.
 */
export function itemsUpdate(request: express.Request, response: express.Response) {
	const id = request.body['id'];
	if (!id || typeof id != 'number' || id <= 0) {
		writeError(response, 400, "Missing or invalid 'id' supplied");
		return;
	}

	DB_POOL.execute('SELECT * FROM items WHERE id=?', [id], (err, results, fields) => {
		if (err) {
			console.error(err);
			writeError(response, 500, "Failed to read from the database");
			return;
		} else if (results.length === 0) {
			writeError(response, 400, "The requested item could not be found");
			return;
		}
		const field = results[0]['ownerEmail'] === request['authedUserEmail'] ? 'description' : 'buyerComments';
		const newValue = request.body[field];
		if (typeof newValue !== 'string' || newValue.length >= 1024 || (field === 'description' && newValue.length === 0)) {
			writeError(response, 400, "Missing or invalid '" + field + "' supplied");
			return;
		}
		DB_POOL.execute(`UPDATE items SET ${field}=? WHERE id=?`, [newValue, id], (err, results, fields) => {
			if (err) {
				console.error(err);
				writeError(response, 500, "Failed to read from the database");
				return;
			}
			writeSuccess(response, {
				'id': results['insertId'],
				'ownerEmail': request['authedUserEmail'],
				'description': request.body['description'],
				'buyerComments': request.body['buyerComments']
			});
		})
	});
}


export function secretSantaGet(request: express.Request, response: express.Response): void {
	const year = new Date().getFullYear();
	DB_POOL.execute('SELECT * FROM secret_santa_themes WHERE year=?', [year], (err, results, fields) => {
		if (err || !results.length) {
			writeError(response, 500, "Secret Santa hasn't been set up for this year yet.");
			return;
		}
		const theme = results[0]['theme'];
		DB_POOL.execute('SELECT * FROM secret_santas WHERE email=? AND year=?', [request['authedUserEmail'], year], (err, results, fields) => {
			if (err) {
				console.error(err);
				writeError(response, 500, "Failed to read from the database");
				return;
			} else if (results.length === 0) {
				writeError(response, 400, "You have no secret santa :(");
				return;
			}
			writeSuccess(response, {
				theme: theme,
				person: results[0]['person'],
			});
		});
	})
}

