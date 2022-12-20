import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MeetupsPageModule} from "./components/pages/meetups-page/meetups-page.module";
import {MeetupService} from "./services/meetup/meetup.service";
import {ENVIRONMENT, EnvironmentService} from "./services/environment/environment.service";
import {environment} from "../environment/environment";
import {AuthPageModule} from "./components/pages/auth-page/auth-page.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth/auth.service";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HeaderModule} from "./components/header/header.module";
import {UsersPageModule} from "./components/pages/users-page/users-page.module";
import {PaginationModule} from "./components/pagination/pagination.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MeetupsPageModule,
    AuthPageModule,
    HttpClientModule,
    HeaderModule,
    UsersPageModule,
    PaginationModule
  ],
  providers: [
    MeetupService,
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    AuthService,
    EnvironmentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
