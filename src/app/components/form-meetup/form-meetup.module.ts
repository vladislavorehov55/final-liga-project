import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormMeetupComponent} from './form-meetup.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormMeetupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FormMeetupComponent]
})
export class FormMeetupModule {
}
