import { Injectable } from '@angular/core';
import {Deferred} from '../models/deferred';


/**
 * The AuthService handles working with the Google auth API.
 */
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
		// If the page is still loading, we should wait for it to complete before loading the Google API
		if (document.readyState != 'complete') {
			window.addEventListener('load', () => {
				gapi.load('client:auth2', this.initializeClient.bind(this));
			});
		} else {
			gapi.load('client:auth2', this.initializeClient.bind(this));
		}
		this.initDeferred = new Deferred();
	}

	public getCurrentUser(): gapi.auth2.GoogleUser {
		if (!this.isAuthed()) {
			return null;
		} else {
			return this.apiClient.currentUser.get();
		}
	}

	public getAuthToken(): string {
		if (!this.isAuthed()) {
			return null;
		} else {
			return this.apiClient.currentUser.get().getAuthResponse().id_token;
		}
	}

	public isAuthed(): boolean {
		if (!this.apiClient) {
			return false;
		}
		const user = this.apiClient.currentUser.get();
		return user.hasGrantedScopes(AuthService.SCOPES);
	}

	/**
	 * Sign the user in using the Google API.
	 * Note that if the user is already signed in and has authed this app, the initial popup
	 * window won't appear unless `forceReauth` is passed as true.
	 */
	public async signIn(forceReauth = false): Promise<gapi.auth2.GoogleUser> {
		if (this.isAuthed() && !forceReauth) {
			return this.apiClient.currentUser.get();
		} else if (this.signInDeferred) {
			return this.signInDeferred;
		} else {
			this.signInDeferred = new Deferred();
			try {
				await this.initDeferred;
				let user: gapi.auth2.GoogleUser;
				if (this.isAuthed() && !forceReauth) {
					user = this.apiClient.currentUser.get();
				} else {
					user = await this.apiClient.signIn();
				}
				this.signInDeferred.resolve(user);
				this.signInDeferred = null;
				return user;

			} catch (error) {
				this.signInDeferred.reject(error);
				this.signInDeferred = null;
				throw error;
			}
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
