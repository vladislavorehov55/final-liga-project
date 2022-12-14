import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import {RouterModule} from "@angular/router";
import {MyInputModule} from "../../shared/my-input/my-input.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyInputModule,
    ReactiveFormsModule
  ],
  exports: [AuthPageComponent]
})
export class AuthPageModule { }
