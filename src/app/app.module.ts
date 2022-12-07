import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MeetupsPageModule} from "./components/pages/meetups-page/meetups-page.module";
import {MeetupService} from "./services/meetup/meetup.service";
import {ENVIRONMENT} from "./services/environment/environment.service";
import {environment} from "../environment/environment";
import {AuthPageModule} from "./components/pages/auth-page/auth-page.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MeetupsPageModule,
    AuthPageModule
  ],
  providers: [
    MeetupService,
    {
      provide: ENVIRONMENT,
      useValue: environment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
