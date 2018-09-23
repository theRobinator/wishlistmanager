import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';

import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {ListsComponent} from './lists/lists.component';

import {AppRoutingModule} from './app-routing.module';

import {ApiService} from './api/api.service';
import {AuthService} from './auth/auth.service';
import { ItemTextareaComponent } from './item-textarea/item-textarea.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListsComponent,
    ItemTextareaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    AuthService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
