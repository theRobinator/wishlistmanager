import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {ListsComponent} from './lists/lists.component';

/**
 * All the paths available in the app, and their base components.
 */
const routes: Routes = [
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{ path: 'auth', component: AuthComponent },
	{ path: 'lists', component: ListsComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule {}
