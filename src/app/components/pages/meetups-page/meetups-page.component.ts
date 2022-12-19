import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../../services/form/form.service";
import {MeetupService} from "../../../services/meetup/meetup.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent implements OnInit, OnDestroy{
  constructor(private _formService: FormService,
              private _meetupsService: MeetupService,
              private _cdr: ChangeDetectorRef) {
  }
  private _errorSubscription = new Subscription()
  private _serverError: string = ''
  get serverError() {
    return this._serverError
  }

  ngOnInit() {
    this._errorSubscription = this._meetupsService.meetupsErrorSubject.subscribe({
      next: (err) => {
        this._serverError = err
        this._cdr.detectChanges()
      }
    })
  }
  ngOnDestroy() {
    this._errorSubscription.unsubscribe()
  }

  openFormHandler() {
    this._formService.setForm('MEETUP', 'ADD',  'Создания митапа', '', {
      name: '',
      description: '',
      location: '',
      duration: 90,
      target_audience: '',
      will_happen: '',
      need_to_know: '',
      reason_to_come: '',
      date:  '',
      time: ''
    })
    this._formService.openForm()
  }
}
