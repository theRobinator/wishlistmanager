import { Component } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  	constructor(router: Router) {
  		// Make sure everybody auths first
  		router.navigateByUrl('/auth');
  	}
}
