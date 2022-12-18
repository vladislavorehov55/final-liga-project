import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  private _createForm() {
    this.form = new FormGroup({
      login: new FormControl<string>('', {
        validators: [Validators.required, Validators.email]
      } ),
      password: new FormControl<string>('', {
        validators: [Validators.required]
      })
    })
  }

  loginError: string = ''
  passwordError: string = ''
  onBlurLoginHandler() {
    if (this.form.controls.login.errors?.['required']) {
      this.loginError = 'Поле не заполнено'
    }
    else if (this.form.controls.login.errors?.['email']) {
      this.loginError = 'Некорректная почта'
    }
  }
  onFocusLoginHandler() {
    this.loginError = ''
    if (this.form.controls.login.invalid) {
      this.form.controls.login.reset()
    }
  }
  onBlurPasswordHandler() {
    if (this.form.controls.password.errors) {
      this.passwordError = 'Поле не заполнено'
    }
  }
  onFocusPasswordHandler() {
    if (this.form.controls.password.invalid) {
      this.form.controls.password.reset()
    }
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault()
    this._authService.login(this.form.value.login, this.form.value.password)
  }

}
