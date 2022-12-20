import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import {UsersListModule} from "../../users-list/users-list.module";
import {ModalModule} from "../../shared/modal/modal.module";
import {FormUserModule} from "../../form-user/form-user.module";
import {PaginationModule} from "../../pagination/pagination.module";
import {SearchModule} from "../../search/search.module";



@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersListModule,
    ModalModule,
    FormUserModule,
    PaginationModule,
    SearchModule
  ],
  exports: [UsersPageComponent]
})
export class UsersPageModule { }
