import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {MeetupService} from "../../services/meetup/meetup.service";
import {FormService} from "../../services/form/form.service";
import {Subscription} from "rxjs";


// export interface IFormFields {
//   name: string
//   description: string
//   date: string
//   time: string
//   duration: number
//   location: string
//   target_audience: string
//   need_to_know: string
//   will_happen: string,
//   reason_to_come: string
// }

@Component({
  selector: 'app-form-meetup',
  templateUrl: './form-meetup.component.html',
  styleUrls: ['./form-meetup.component.scss']
})
export class FormMeetupComponent implements OnInit, OnDestroy{
  private _isShow: boolean = false
  private _isShowSubscription!: Subscription

  private _timeError: string = ''
  private _nameError: string = ''
  private _dateError: string = ''
  private _locationError: string = ''



  constructor(private _formService: FormService,
              private _meetupService: MeetupService,
              private _cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this._isShowSubscription = this._formService.isShowMeetupForm.subscribe(isShow => {
      this._isShow = isShow
      this._cdr.detectChanges()
    })

  }


  ngOnDestroy() {
    this._isShowSubscription.unsubscribe()
  }

  get form() {
    return this._formService.form
  }

  get title() {
    return this._formService.title
  }

  get isShow() {
    return this._isShow
  }

  get formMethodType() {
    return this._formService.formMethodType
  }

  get timeError() {
    return this._timeError
  }
  get nameError() {
    return this._nameError
  }
  get dateError() {
    return this._dateError
  }
  get locationError() {
    return this._locationError
  }

  focusInputHandler(e: any) {
    const {name} = e.target
    switch (name) {
      case 'name':
        if (this.nameError) {
          this.form.controls[name].reset()
          this._nameError = ''
        }
        break
      case 'date':
        if (this.dateError) {
          this.form.controls[name].reset()
          this._dateError = ''
        }
        break
      case 'time':
        if (this.timeError) {
          this.form.controls[name].reset()
          this._timeError = ''
        }
        break
      case 'location':
        if (this.locationError) {
          this.form.controls[name].reset()
          this._locationError = ''
        }
        break
    }
  }

  blurInputHandler(e: any) {
    const {name} = e.target
    const inputValue = this.form.value[name]
    let error
    switch (name) {
      case 'name':
        error = this.validateName(inputValue)
        if (error) {
          this._nameError = error.invalidName
        }
        break
      case 'date':
        error = this.validateDate(inputValue)
        if (error) {
          this._dateError = error.invalidDate
        }
        break
      case 'time':
        error = this.validateTime(inputValue)
        if (error) {
          this._timeError = error.invalidTime
        }
        break
      case 'location':
        error = this.validateLocation(inputValue)
        if (error) {
          this._locationError = error.invalidLocation
        }
    }
  }
  private validateName(value: string) {
    if (!Boolean(value)) {
      return {invalidName: 'Не заполнено'}
    }
    if (value.length > 50) {
      return {invalidName: 'Больше 50 символов'}
    }
    return null
  }
  private validateDate(value: string) {
    if (!Boolean(value)) {
      return {invalidDate: 'Поле не заполнено'}
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
  private validateTime(value: string) {
    if (!Boolean(value)) {
      return {invalidTime: 'Не заполнено'}
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
  private validateLocation(value: string) {
    if (!Boolean(value)) {
      return {invalidLocation: 'Поле не заполнено'}
    }
    return null
  }

  addMeetupHandler() {
    if (this.form.invalid) {
      return
    }
    const newMeetup: any = {}
    const timeComponents: [number, number, number, number, number] = [0, 0, 0, 0, 0]
    for (let field in this.form.controls) {
      if (field === 'date') {
        timeComponents.splice(0, 3, ...this.form.controls[field].value.split('.').reverse().map((item: string) => +item))
      } else if (field === 'time') {
        timeComponents.splice(3, 2, ...this.form.controls[field].value.split(':').map((item: string) => +item))
      } else {
        newMeetup[field] = this.form.controls[field].value
      }
    }
    timeComponents[1] = timeComponents[1] - 1
    newMeetup['time'] = new Date(...timeComponents).toISOString()
    console.log('newMeetup', newMeetup)
    this._meetupService.addMeetup(newMeetup)
  }

  editMeetupHandler() {
    this._meetupService.editMeetup(this.form)
  }

  closeFormHandler() {
    this._timeError = ''
    this._dateError = ''
    this._timeError = ''
    this._locationError = ''
    this._formService.closeForm()
  }

}
