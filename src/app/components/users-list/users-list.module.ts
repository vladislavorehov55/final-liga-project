import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import {UserItemModule} from "../user-item/user-item.module";



@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UserItemModule
  ],
  exports: [UsersListComponent]
})
export class UsersListModule { }
