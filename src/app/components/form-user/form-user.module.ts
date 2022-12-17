import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserComponent } from './form-user.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FormUserComponent
  ],
  exports: [
    FormUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormUserModule { }
