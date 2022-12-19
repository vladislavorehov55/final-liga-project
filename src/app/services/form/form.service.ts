import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";

interface IUserFormFields {
  fio: string
  email: string
  password: string
}
interface IUserFormGroup {
  fio: FormControl<string | null>
  email: FormControl<string | null>
  password: FormControl<string | null>
}
interface IMeetupFormFields {
  name: string
  description: string
  date: string
  time: string
  duration: number
  location: string
  target_audience: string
  need_to_know: string
  will_happen: string,
  reason_to_come: string
}
interface IMeetupFormGroup {
  name: FormControl<string | null>
  description: FormControl<string | null>
  date: FormControl<string | null>
  time: FormControl<string | null>
  duration: FormControl<number | null>
  location: FormControl<string | null>
  target_audience: FormControl<string | null>
  need_to_know: FormControl<string | null>
  will_happen: FormControl<string | null>
  reason_to_come: FormControl<string | null>
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  title: string = ''
  isShow: boolean = false

  formType: string = ''
  formMethodType: string = ''
  userRole: string = ''

  form!: FormGroup

  constructor(private _userService: UserService) {
  }

  setForm(formType: string, formMethodType: string, title: string, userRole: string, formFieldsValue: IUserFormFields | IMeetupFormFields ) {
    this.formType = formType
    this.formMethodType = formMethodType
    this.title = title
    if (this.formType === 'USER') {
      formFieldsValue = formFieldsValue as IUserFormFields
      this.userRole = userRole
      this.form = new FormGroup<IUserFormGroup>({
        fio: new FormControl(formFieldsValue.fio, {
          validators: [Validators.required]
        }),
        email: new FormControl(formFieldsValue.email, {
          validators: [Validators.required, Validators.email]
        }),
        password: new FormControl(formFieldsValue.password, {
          validators: [Validators.required]
        })
      })
    }
    else if (this.formType === 'MEETUP') {
      formFieldsValue = formFieldsValue as IMeetupFormFields
      this.form = new FormGroup<IMeetupFormGroup>({
        name: new FormControl(formFieldsValue.name),
        date: new FormControl(formFieldsValue.date),
        time: new FormControl(formFieldsValue.time),
        location: new FormControl(formFieldsValue.location),
        description: new FormControl(formFieldsValue.description),
        target_audience: new FormControl(formFieldsValue.target_audience),
        need_to_know: new FormControl(formFieldsValue.need_to_know),
        will_happen: new FormControl(formFieldsValue.will_happen),
        duration: new FormControl(formFieldsValue.duration),
        reason_to_come: new FormControl(formFieldsValue.reason_to_come)
      })
    }

  }

}
