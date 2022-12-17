import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FormControl, FormGroup} from "@angular/forms";

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
      login: new FormControl<string>(''),
      password: new FormControl<string>('')
    })
  }


  submitHandler(event: SubmitEvent) {
    event.preventDefault()
    this._authService.login(this.form.get('login')?.value, this.form.get('password')?.value)
  }

}
