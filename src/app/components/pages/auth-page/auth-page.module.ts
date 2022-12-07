import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AuthPageComponent]
})
export class AuthPageModule { }
