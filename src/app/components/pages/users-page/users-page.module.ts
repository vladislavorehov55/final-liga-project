import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import {ListModule} from "../../shared/list/list.module";



@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    ListModule
  ],
  exports: [UsersPageComponent]
})
export class UsersPageModule { }
