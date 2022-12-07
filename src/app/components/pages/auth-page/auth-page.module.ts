import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import {RouterModule} from "@angular/router";
import {MyInputModule} from "../../shared/my-input/my-input.module";



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyInputModule
  ],
  exports: [AuthPageComponent]
})
export class AuthPageModule { }
