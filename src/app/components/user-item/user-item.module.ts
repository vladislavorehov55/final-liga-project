import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item.component';
import {SvgGeneratorModule} from "../shared/svg-generator/svg-generator.module";



@NgModule({
  declarations: [
    UserItemComponent
  ],
  exports: [
    UserItemComponent
  ],
  imports: [
    CommonModule,
    SvgGeneratorModule
  ]
})
export class UserItemModule { }
