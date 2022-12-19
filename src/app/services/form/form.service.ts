import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {BehaviorSubject} from "rxjs";

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
        console.log('qweee')

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

  private subscribeInput(value: string, name: string) {
    if (value === '') {
      this.form.controls[name].reset()
    }
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
    } else if (this.formType === 'MEETUP') {
      formFieldsValue = formFieldsValue as IMeetupFormFields
      this.form = new FormGroup<IMeetupFormGroup>({
        name: new FormControl(formFieldsValue.name, {
          validators: [Validators.required, Validators.maxLength(50)]
        }),
        date: new FormControl(formFieldsValue.date, {
          validators: [
            Validators.required,
            // Validators.minLength(10),
            // Validators.maxLength(10),
            this.dateValidator
          ]
        }),
        time: new FormControl(formFieldsValue.time, {
          validators: [Validators.required, this.timeValidator]
        }),
        location: new FormControl(formFieldsValue.location, {
          validators: [Validators.required]
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
          validators: [Validators.max(120)]
        }),
        reason_to_come: new FormControl(formFieldsValue.reason_to_come, {
          validators: [Validators.maxLength(30)]
        })
      })
      this.form.get('name')?.valueChanges.subscribe(value => {
        console.log('Evaluate')
        this.subscribeInput(value, 'name')
      })
      this.form.get('date')?.valueChanges.subscribe((value => {
        this.subscribeInput(value, 'date')
      }))


      this.form.get('time')?.valueChanges.subscribe(value => {
        console.log('value2', value)
        const control = this.form.controls['time']
        console.log('error', control)
        if (value === '') {
          control.reset()
        } else if (control.untouched === false && control.errors) {
          this._timeError = control.errors['required'] ? control.errors['required'] : control.errors['invalidTime']
        }

        // if (value === '') {
        //   this.form.controls['time'].reset()
        // }
        // else {
        //   const {errors} = this.form.controls['time']
        //   if (errors) {
        //     if (errors['required']) {
        //       this._timeError = 'Не заполнено'
        //     }
        //     else if (errors['invalidTime']) {
        //       this._timeError = errors['invalidTime']
        //     }
        //   }
        // }
      })


      this.form.get('location')?.valueChanges.subscribe(value => {
        this.subscribeInput(value, 'location')
      })
    }
  }

  _nameError: string = ''
  _dateError: string = ''
  _timeError: string = ''
  _locationError: string = ''

  get nameError() {
    return this._nameError
  }

  get dateError() {
    return this._dateError
  }

  get timeError() {
    return this._timeError
  }

  get locationError() {
    return this._locationError
  }


  private timeValidator(control: FormControl): ValidationErrors | null {
    const value: string = control.value
    console.log('value', value)
    if (!Boolean(value)) {
      return {invalidTime: true}
    }
    if (value.length !== 5) {
      return {invalidTime: 'Заполнено не верно'}
    }
    if (!value[0].match(/[0-2]/)) {
      return {invalidTime: 'Заполнено не верно'}
    } else if (value[0] === '2' && value[1] && !['0', '1', '2', '3'].includes(value[1])) {
      return {invalidTime: 'Заполнено не верно'}
    } else if (value[1] && !value[1].match(/[0-9]/)) {
      return {invalidTime: 'Заполнено не верно'}
    } else if (value[2] && value[2] !== ':') {
      return {invalidTime: 'Заполнено не верно'}
    } else if (value[3] && !value[3].match(/[0-5]/)) {
      return {invalidTime: 'Заполнено не верно'}
    } else if (value[4] && !value[4].match(/[0-9]/)) {
      return {invalidTime: 'Заполнено не верно'}
    }
    return null
  }

  private dateValidator(control: FormControl): ValidationErrors | null {
    const value: string = control.value
    if (value === '') {
      return null
    }
    if (value.length !== 10) {
      return {invalidDate: 'Некорректная дата'}
    }
    const parsedDate = Date.parse(value.split('.').reverse().join('-'))
    if (Date.now() > parsedDate) {
      return {invalidDate: 'Дата уже прошла'}
    }
    if (isNaN(parsedDate)) {
      return {invalidDate: 'Некорректная дата'}
    }

    return null
  }
}
