import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupItemComponent } from './meetup-item.component';
import {SvgGeneratorModule} from "../shared/svg-generator/svg-generator.module";



@NgModule({
  declarations: [
    MeetupItemComponent
  ],
  imports: [
    CommonModule,
    SvgGeneratorModule
  ],
  exports: [MeetupItemComponent]
})
export class MeetupItemModule { }
