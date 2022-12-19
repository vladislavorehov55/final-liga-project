import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {BehaviorSubject, Subscription} from "rxjs";

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
  isShowUserForm = new BehaviorSubject(false)
  isShowMeetupForm = new BehaviorSubject(false)
  formType: string = ''
  formMethodType: string = ''
  userRole: string = ''



  form!: FormGroup

  constructor(private _userService: UserService) {
  }

  openForm() {
    switch (this.formType) {
      case 'USER':
        this.isShowUserForm.next(true)
        break
      case 'MEETUP':
        this.isShowMeetupForm.next(true)
        break
    }
  }

  closeForm() {
    switch (this.formType) {
      case 'USER':
        this.isShowUserForm.next(false)
        break
      case 'MEETUP':
        this.isShowMeetupForm.next(false)
        break
    }
  }


  private _emailError: string = ''
  private _fioError: string = ''
  private _passwordError: string = ''

  get emailError() {
    return this._emailError
  }
  set emailError(email) {
    this._emailError = email
  }
  get fioError() {
    return this._fioError
  }
  set fioError(value) {
    this._fioError = value
  }
  get passwordError() {
    return this._passwordError
  }
  set passwordError(value) {
    this._passwordError = value
  }


  private _subscriptionFioField:Subscription = new Subscription()
  get subscriptionFioField() {
    return this._subscriptionFioField
  }
  private _subscriptionEmailField = new Subscription()
  get subscriptionEmailField() {
    return this._subscriptionEmailField
  }

  private _subscriptionPasswordField = new Subscription()
  get subscriptionPasswordField() {
    return this._subscriptionPasswordField
  }
  setForm(formType: string, formMethodType: string, title: string, userRole: string, formFieldsValue: IUserFormFields | IMeetupFormFields) {
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
      this._subscriptionFioField = this.form.controls['fio'].valueChanges.subscribe((value) => {
        const {errors, untouched, invalid} = this.form.controls['fio']
        if (!invalid) {
          this._fioError = ''
        }
        if (!untouched && invalid) {
          if (errors) {
            if (errors['required']) {
              this._fioError = 'Поле не заполнено'
            }
          }
        }
      })

      this._subscriptionEmailField = this.form.controls['email'].valueChanges.subscribe((value) => {
        const {errors, untouched, invalid} = this.form.controls['email']
        if (!invalid) {
          this._emailError = ''
        }
        if (!untouched && invalid) {
          if (errors) {
            if (errors['required']) {
              this._emailError = 'Поле не заполнение'
            }
            else if (errors['email'] ) {
              this._emailError = 'Некорректное поле'
            }
          }
        }
      })
      this._subscriptionPasswordField = this.form.controls['password'].valueChanges.subscribe((value) => {
        const {errors, untouched, invalid} = this.form.controls['password']
        if (!invalid) {
          this._fioError = ''
        }
        if (!untouched && invalid) {
          if (errors) {
            if (errors['required']) {
              this._passwordError = 'Поле не заполнено'
            }
          }
        }
      })
    } else if (this.formType === 'MEETUP') {
      formFieldsValue = formFieldsValue as IMeetupFormFields
      this.form = new FormGroup<IMeetupFormGroup>({
        name: new FormControl(formFieldsValue.name, {
          validators: []
        }),
        date: new FormControl(formFieldsValue.date, {
          validators: []
        }),
        time: new FormControl(formFieldsValue.time, {
          validators: []
        }),
        location: new FormControl(formFieldsValue.location, {
          validators: []
        }),
        description: new FormControl(formFieldsValue.description, {
          validators: []
        }),
        target_audience: new FormControl(formFieldsValue.target_audience, {
          validators: []
        }),
        need_to_know: new FormControl(formFieldsValue.need_to_know, {
          validators: []
        }),
        will_happen: new FormControl(formFieldsValue.will_happen, {
          validators: []
        }),
        duration: new FormControl(formFieldsValue.duration, {
          validators: []
        }),
        reason_to_come: new FormControl(formFieldsValue.reason_to_come, {
          validators: []
        })
      })
    }
  }
}
