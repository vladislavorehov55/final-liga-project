import {Component, OnInit, AfterContentChecked} from '@angular/core';
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
export class FormUserComponent implements OnInit, AfterContentChecked{
  constructor(private _formService: FormService, private _roleService: RoleService,
              private _userService: UserService) {
  }
  userRoleInit = ''
  ngAfterContentChecked() {
    this.userRoleInit = this.userRoleInit == '' ? this.userRole : this.userRoleInit
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
    console.log('Render form user')
    return this._formService.title
  }

  get isShow() {
    return this._formService.isShow
  }

  get formMethodType() {
    return this._formService.formMethodType
  }

  closeFormHandler() {
    this._formService.isShow = false
  }

  get userRole() {
    return this._formService.userRole
  }

  get changeDetect() {
    console.log('Render form user')
    return ''
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
    const {fio, password, email} = this.form.value
    this._userService.updateUser(fio, password, email, this.userRole, this.userRoleInit)
  }
}
