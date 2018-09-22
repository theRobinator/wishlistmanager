import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ListsComponent } from './lists/lists.component';

import { AppRoutingModule } from './app-routing.module';

import {AuthService} from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
