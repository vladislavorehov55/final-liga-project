import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import {UsersListModule} from "../../users-list/users-list.module";
import {ModalModule} from "../../shared/modal/modal.module";



@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersListModule,
    ModalModule
  ],
  exports: [UsersPageComponent]
})
export class UsersPageModule { }
