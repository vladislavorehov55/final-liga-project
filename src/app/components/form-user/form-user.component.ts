import {AfterContentChecked, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormService} from "../../services/form/form.service";
import {RoleService} from "../../services/role/role.service";
import {IRole} from "../../models/role";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
   fioError: string = ''
   emailError: string = ''
   passwordError: string = ''

  // get fioError() {
  //   return this._fioError
  // }
  // get emailError() {
  //   return this._emailError
  // }
  // get passwordError() {
  //   return this._passwordError
  // }
  onBlurInputHandler(e: any) {
    const {name} = e.target
    switch (name) {
      case 'fio':
        if (this.form.controls[name].errors) {
          console.log('aaaq')
          this.fioError = 'Поле не заполнено'
        }
        break
      case 'email':
        const error = this.form.controls[name].errors
        if (error) {
          if (error['required']) {
            this.emailError = 'Поле не заполнено'
          }
          else if (error['email']) {
            this.emailError = ''
          }
        }
        break
      case 'password':
        if (this.form.controls[name].errors) {
          this.passwordError = 'Поле не заполнено'
        }
        break
    }
  }

  onFocusHInputHandler(e: any) {
    const {name} = e.target
    switch (name) {
      case 'fio':
        this.fioError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break
      case 'email':
        this.emailError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break
      case 'password':
        this.passwordError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break

    }
  }
}
