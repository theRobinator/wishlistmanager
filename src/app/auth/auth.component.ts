import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ApiService} from '../api/api.service';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {
	public message: string;
	public hadError: boolean = false;

	constructor(
		private apiService: ApiService,
		private authService: AuthService,
		private router: Router,
	) { }

	public ngOnInit() {
		this.signIn();
  	}

  	public async signIn(forceReauth: boolean = false) {
  		this.message = 'Logging in...';
  		this.hadError = false;
  		try {
  			const user = await this.authService.signIn(forceReauth);
  			await this.apiService.checkAuth();

  			const profile = user.getBasicProfile();
			this.message = `You are signed in as ${profile.getName()} with email address ${profile.getEmail()}!`;
			this.router.navigateByUrl('/lists');
  		} catch (error) {
  			const message = error['error'] || error;
  			this.message = `Sign in failed with an error: ${message}`;
			this.hadError = true;
  		}
  	}

}
