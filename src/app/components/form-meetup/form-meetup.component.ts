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
  constructor(private _formService: FormService,
              private _meetupService: MeetupService,
              private _cdr: ChangeDetectorRef
              ) {
  }

  ngOnInit() {
    this._formService.isShowMeetupForm.subscribe(isShow => {
      this._isShow = isShow
      this._cdr.detectChanges()
    })
  }
  ngOnDestroy() {
    this._formService.isShowMeetupForm.unsubscribe()
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



  addMeetupHandler() {
    const newMeetup: any = {}
    const timeComponents: [number, number, number, number, number] = [0, 0, 0, 0, 0]
    for (let field in this.form.controls) {
      if (field === 'date') {
        timeComponents.splice(0, 3, ...this.form.controls[field].value.split('.').reverse().map((item: string) => +item))
      }
      else if (field === 'time') {
        timeComponents.splice(3, 2, ...this.form.controls[field].value.split(':').map((item: string) => +item))
      }
      else {
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
    this._formService.closeForm()
  }

}
