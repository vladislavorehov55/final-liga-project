import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FormService} from "../../services/form/form.service";
import {RoleService} from "../../services/role/role.service";
import {IRole} from "../../models/role";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUserComponent implements OnInit, AfterContentChecked, OnDestroy {

  private _isShow: boolean = false
  private _userRoleInit = ''
  private _isShowSubscription!: Subscription
  constructor(private _formService: FormService, private _roleService: RoleService,
              private _userService: UserService, private _cdr: ChangeDetectorRef) {
  }

  ngAfterContentChecked() {
    if (this._formService.formMethodType === 'EDIT') {
      const password = this.form.controls['password']
      password.clearValidators()
      password.updateValueAndValidity()
    }
    this._userRoleInit = this._userRoleInit == '' ? this.userRole : this._userRoleInit
  }

  ngOnInit() {
    // this._roleService.getDataRoles()
    this._isShowSubscription = this._formService.isShowUserForm.subscribe(isShow => {
      this._isShow = isShow
      this._cdr.detectChanges()
    })
  }

  ngOnDestroy() {
    this._isShowSubscription.unsubscribe()
    this._formService.subscriptionFioField.unsubscribe()
    this._formService.subscriptionEmailField.unsubscribe()
    this._formService.subscriptionPasswordField.unsubscribe()
    console.log('Destroy form user')
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
    return this._isShow
  }

  get formMethodType() {
    return this._formService.formMethodType
  }

  closeFormHandler() {
    this._formService.fioError = ''
    this._formService.emailError = ''
    this._formService.passwordError = ''
    this._formService.closeForm()
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
    if (this.form.invalid) {
      return
    }
    this._userService.addUser(this.userRole, {
      fio: this.form.value.fio,
      password: this.form.value.password,
      email: this.form.value.email
    })
  }

  updateUserHandler() {
    if (this.form.invalid) {
      return
    }
    const {fio, password, email} = this.form.value
    this._userService.updateUser(fio, password, email, this.userRole, this._userRoleInit)
  }


  get fioError() {
    return this._formService.fioError
  }

  get emailError() {
    return this._formService.emailError
  }

  get passwordError() {
    return this._formService.passwordError
  }

  onBlurInputHandler(e: any) {
    const {name} = e.target
    switch (name) {
      case 'fio':
        if (this.form.controls[name].errors) {
          this._formService.fioError = 'Поле не заполнено'
        }
        break
      case 'email':
        const error = this.form.controls[name].errors
        if (error) {
          if (error['required']) {
            this._formService.emailError = 'Поле не заполнено'
          } else if (error['email']) {
            this._formService.emailError = 'Некорректное поле'
          }
        }
        break
      case 'password':

        if (this.form.controls[name].errors) {
          this._formService.passwordError = 'Поле не заполнено'
        }
        break
    }
  }

  onFocusHInputHandler(e: any) {
    const {name} = e.target
    switch (name) {
      case 'fio':
        this._formService.fioError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break
      case 'email':
        this._formService.emailError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break
      case 'password':
        this._formService.passwordError = ''
        if (this.form.controls[name].invalid) {
          this.form.controls[name].reset()
        }
        break

    }
  }
}
