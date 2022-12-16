import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsPageComponent } from './meetups-page.component';
import {MeetupsListModule} from "../../meetups-list/meetups-list.module";
import {FormMeetupModule} from "../../form-meetup/form-meetup.module";
import {SearchModule} from "../../search/search.module";



@NgModule({
  declarations: [
    MeetupsPageComponent
  ],
  imports: [
    CommonModule,
    MeetupsListModule,
    FormMeetupModule,
    SearchModule
  ],
  exports: [MeetupsPageComponent]
})
export class MeetupsPageModule { }
