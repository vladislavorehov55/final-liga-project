import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  form!: FormGroup<{
    login: FormControl
    password: FormControl
  }>

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._createForm()
  }
  ngOnDestroy() {
    this._loginSubscription.unsubscribe()
    this._passwordSubscription.unsubscribe()
  }
  private _login!: string
  get login() {
    return this._login
  }
  private _password!: string
  get password() {
    return this._password
  }

  private _loginSubscription = new Subscription()
  private _passwordSubscription = new Subscription()
  private _createForm() {
    this.form = new FormGroup({
      login: new FormControl<string>('', {
        validators: [Validators.required, Validators.email]
      } ),
      password: new FormControl<string>('', {
        validators: [Validators.required]
      })
    })
    this._passwordSubscription = this.form.controls['password'].valueChanges.subscribe((value) => {
      const {errors, untouched, invalid} = this.form.controls['password']
      if (!invalid) {
        this._passwordError = ''
      }
      if (!untouched && invalid) {
        if (errors) {
          if (errors['required']) {
            this._passwordError = 'Поле не заполнено'
          }
        }
      }
    })
    this._loginSubscription = this.form.controls['login'].valueChanges.subscribe((value) => {
      const {errors, untouched, invalid} = this.form.controls['login']
      if (!invalid) {
        this._loginError = ''
      }
      if (!untouched && invalid) {
        if (errors) {
          if (errors['required']) {
            this._loginError = 'Поле не заполнено'
          }
          else if (errors['email'] ) {
            this._loginError = 'Некорректное поле'
          }
        }
      }
    })
    this.form.get('login')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.form.controls.login.reset()
      }
    })
  }

  private _loginError: string = ''
  private _passwordError: string = ''
  get passwordError() {
    return this._passwordError
  }
  get loginError() {
    return this._loginError
  }
  onBlurLoginHandler() {
    if (this.form.controls.login.errors?.['required']) {
      this._loginError = 'Поле не заполнено'
    }
    else if (this.form.controls.login.errors?.['email']) {
      this._loginError = 'Некорректное поле'
    }
  }
  onFocusLoginHandler() {
    this._loginError = ''
    if (this.form.controls.login.invalid) {
      this.form.controls.login.reset()
    }
  }
  onBlurPasswordHandler() {
    if (this.form.controls.password.errors) {
      this._passwordError = 'Поле не заполнено'
    }
  }
  onFocusPasswordHandler() {
    this._passwordError = ''
    if (this.form.controls.password.invalid) {
      this.form.controls.password.reset()
    }
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault()
    if (this.form.invalid) {
      return
    }
    this._authService.login(this.form.value.login, this.form.value.password)
  }

  get serverError() {
    return this._authService.serverError
  }

}
