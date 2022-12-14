import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsPageComponent } from './meetups-page.component';
import {MeetupsListModule} from "../../meetups-list/meetups-list.module";
import {FormAddModule} from "../../form-add/form-add.module";



@NgModule({
  declarations: [
    MeetupsPageComponent
  ],
  imports: [
    CommonModule,
    MeetupsListModule,
    FormAddModule
  ],
  exports: [MeetupsPageComponent]
})
export class MeetupsPageModule { }
