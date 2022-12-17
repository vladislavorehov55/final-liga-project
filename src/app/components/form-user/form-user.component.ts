import {Component, OnInit} from '@angular/core';
import {FormService} from "../../services/form/form.service";
import {RoleService} from "../../services/role/role.service";
import {IRole} from "../../models/role";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit{
  constructor(private _formService: FormService, private _roleService: RoleService) {
  }

  ngOnInit() {
    this._roleService.getDataRoles()
  }

  get roles() {
    return this._roleService.roles
  }

  get form() {
    return this._formService.form
  }

  get title() {
    return this._formService.title
  }

  get isSown() {
    return this._formService.isShow
  }

  get formType() {
    return this._formService.formType
  }

  closeFormHandler() {
    this._formService.isShow = false
  }

  userRole: string = 'user'

  get chosenUserRole() {
    return this.userRole
  }

  changeUserRoleHandler(role: IRole) {
    this.userRole = role.name
  }
}
