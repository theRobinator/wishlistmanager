import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {ListsComponent} from './lists/lists.component';

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
