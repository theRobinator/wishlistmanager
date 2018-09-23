import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {AuthService} from '../auth/auth.service';
import {ListItem} from '../models/listitem';
import {WishList} from '../models/wishlist';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(
		private authService: AuthService,
		private http: HttpClient,
	) {}

	public checkAuth(): Promise<void> {
		return this.makeRequest('auth/check');
	}

	public fetchLists(): Promise<Dictionary<WishList>> {
		return this.makeRequest('lists/get');
	}

	public addToList(description: string): Promise<ListItem> {
		return this.makeRequest('items/add', {
			'description': description,
		});
	}

	public deleteFromList(itemId: number): Promise<void> {
		return this.makeRequest('items/delete', {
			'id': itemId,
		});
	}

	public updateListItem(updatedItem: ListItem): Promise<ListItem> {
		return this.makeRequest('items/update', {
			'id': updatedItem['id'],
			'description': updatedItem['description'],
			'buyerComments': updatedItem['buyerComments'],
		});
	}

	/**
	 * Global request maker that adds common params and promisification.
	 */
	private makeRequest(endpoint: string, params: Dictionary<string|number> = {}): Promise<any> {
		const token = this.authService.getAuthToken();
		if (!token) {
			throw new Error("Not logged in! Can't make an API call.");
		}
		const requestParams: Dictionary<string|number> = {
			'google-token': token,
		};
		for (const i in params) {
			requestParams[i] = params[i];
		}
		return new Promise((resolve, reject) => {
			this.http.post('/api/' + endpoint, requestParams).subscribe(
				data => resolve(data),

				(error: HttpErrorResponse) => {
					if (error.error instanceof ErrorEvent) {
						// A client-side or network error occurred. Handle it accordingly.
						reject(error.error.message);
					} else if (error.status != 200) {
						// The backend returned an unsuccessful response code.
						const message = error.error['message'];
						reject(message || error.error);
					} else {
						reject(error.message || error);
					}
				});
		});
	}
}
