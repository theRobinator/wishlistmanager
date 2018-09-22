import { Injectable } from '@angular/core';
import {Deferred} from '../models/deferred';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private static readonly CLIENT_ID = '352834916195-ovmhpmlusqg6s6cmgeq0e9p1hk3fq5e5.apps.googleusercontent.com';
	private static readonly SCOPES = ['profile', 'email', 'openid'].join(' ');

	private apiClient: gapi.auth2.GoogleAuth;
	private initDeferred: Deferred<void>;
	private signInDeferred: Deferred<gapi.auth2.GoogleUser>;

	constructor() {
		gapi.load('client:auth2', this.initializeClient.bind(this));
		this.initDeferred = new Deferred();
	}

	public getCurrentUser(): gapi.auth2.GoogleUser {
		if (!this.isAuthed()) {
			return null;
		} else {
			return this.apiClient.currentUser.get();
		}
	}

	public isAuthed(): boolean {
		if (!this.apiClient) {
			return false;
		}
		const user = this.apiClient.currentUser.get();
		return user.hasGrantedScopes(AuthService.SCOPES);
	}

	public signIn(): Promise<gapi.auth2.GoogleUser> {
		if (this.isAuthed()) {
			return Promise.resolve(this.apiClient.currentUser.get());
		} else if (this.signInDeferred) {
			return this.signInDeferred;
		} else {
			this.signInDeferred = new Deferred();
			this.initDeferred.then(() => {
				return this.apiClient.signIn();
			}).then(user => {
				this.signInDeferred.resolve(user);
			}).catch(error => {
				this.signInDeferred.reject(error);
			});
			return this.signInDeferred;
		}
	}

	private initializeClient() {
		gapi.client.init({
			clientId: AuthService.CLIENT_ID,
			scope: AuthService.SCOPES
		}).then(() => {
			this.apiClient = gapi.auth2.getAuthInstance();
			this.initDeferred.resolve();
		});
	}
}
