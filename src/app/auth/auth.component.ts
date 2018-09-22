import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
		private authService: AuthService,
		private router: Router,
	) { }

	public ngOnInit() {
		this.signIn();
  	}

  	public signIn() {
  		this.message = 'Logging in...';
  		this.hadError = false;
  		this.authService.signIn().then(user => {
			const profile = user.getBasicProfile();
			this.message = `You are signed in as ${profile.getName()} with email address ${profile.getEmail()}!`;
			setTimeout(() => this.router.navigateByUrl('/lists'), 2000);
		}, error => {
			this.message = `Sign in failed with error ${error['error']}`;
			this.hadError = true;
		});
  	}

}
