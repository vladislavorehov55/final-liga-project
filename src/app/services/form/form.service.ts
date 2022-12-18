import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user/user.service";

interface IUserFormFields {
  fio: string
  email: string
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  title: string = ''
  isShow: boolean = false

  formType: string = 'add_meetup'

  userRole: string = ''

  form!: FormGroup

  constructor(private _userService: UserService) {
  }

  setUserForm(formType: string, title: string, userRole: string, formFieldsValue: IUserFormFields ) {
    this.formType = formType
    this.title = title
    this.userRole = userRole
    this.form = new FormGroup<any>({
      fio: new FormControl(formFieldsValue.fio),
      email: new FormControl(formFieldsValue.email),
      password: new FormControl(formFieldsValue.password)
    })
  }
  add() {
    switch (this.formType) {
      case 'ADD_USER':
        // this._userService.addUser()
        break
      case 'ADD_MEETUP':
        break
    }
  }

}
