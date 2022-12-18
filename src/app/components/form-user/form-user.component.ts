import {Component, OnInit} from '@angular/core';
import {FormService} from "../../services/form/form.service";
import {RoleService} from "../../services/role/role.service";
import {IRole} from "../../models/role";
import {IUser} from "../../models/user";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit{
  constructor(private _formService: FormService, private _roleService: RoleService,
              private _userService: UserService) {
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

  get userRole() {
    return this._formService.userRole
  }



  changeUserRoleHandler(role: IRole) {
    this._formService.userRole = role.name
  }

  addUserHandler() {
    this._userService.addUser(this.userRole,{
      fio: this.form.value.fio,
      password: this.form.value.password,
      email: this.form.value.email
    })
  }
  updateUserHandler() {

    // const {fio, password, email} = this.form.value
    // this._userService.updateUser(fio, password, email, this.userRole, this.userRoleInit)
  }
}
