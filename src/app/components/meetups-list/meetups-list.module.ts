import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsListComponent } from './meetups-list.component';
import {MeetupItemModule} from "../meetup-item/meetup-item.module";



@NgModule({
  declarations: [
    MeetupsListComponent
  ],
  imports: [
    CommonModule,
    MeetupItemModule
  ],
  exports: [MeetupsListComponent]
})
export class MeetupsListModule { }
