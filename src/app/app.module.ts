import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MeetupsPageModule} from "./components/pages/meetups-page/meetups-page.module";
import {MeetupService} from "./servcies/meetup.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MeetupsPageModule
  ],
  providers: [MeetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
