import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  login: string = ''
  password: string = ''

  constructor(private authService: AuthService) {}

  submitHandler(event: SubmitEvent) {
    event.preventDefault()
    this.authService.login(this.login, this.password)
  }
  updateLogin(newLoginValue: string) {
    this.login = newLoginValue
  }
  updatePassword(newPasswordValue: string) {
    this.password = newPasswordValue
  }
}
