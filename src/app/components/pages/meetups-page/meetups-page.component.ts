import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../../services/form/form.service";
import {MeetupService} from "../../../services/meetup/meetup.service";
import {Subscription} from "rxjs";
import {IMeetup} from "../../../models/meetup";

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent implements OnInit, OnDestroy {

  private _meetupsSubscription!: Subscription

  private _errorSubscription = new Subscription()
  private _serverError: string = ''
  private _currentMeetups: IMeetup[] = []

  constructor(private _formService: FormService,
              private _meetupService: MeetupService,
              private _cdr: ChangeDetectorRef) {
  }

  get serverError() {
    return this._serverError
  }

  get currentMeetups() {
    return this._currentMeetups
  }

  get allMeetups() {
    return this._meetupService.currentAllMeetups
  }
  get meetupsOnPage() {
    return this._meetupService.itemOnPage
  }
  get currentPageNumber() {
    return this._meetupService.currentPageNumber
  }

  changePageHandler(newPage: number) {
    this._meetupService.setMeetupsOnPage(newPage)
  }

  ngOnInit() {
    this._meetupService.setDataMeetups()
    this._meetupsSubscription = this._meetupService.meetupsSubject.subscribe({
      next: (items) => {
        console.log('subscribe', items)
        this._currentMeetups = items
        this._cdr.detectChanges()
      }
    })
    this._errorSubscription = this._meetupService.meetupsErrorSubject.subscribe({
      error: (err) => {
        this._serverError = err
        this._cdr.detectChanges()
      },
    })
  }

  ngOnDestroy() {
    this._errorSubscription.unsubscribe()
    this._meetupService.intervalSubscription.unsubscribe()
    this._meetupsSubscription.unsubscribe()
  }

  openFormHandler() {
    this._formService.setForm('MEETUP', 'ADD', 'Создания митапа', '', {
      name: '',
      description: '',
      location: '',
      duration: 90,
      target_audience: '',
      will_happen: '',
      need_to_know: '',
      reason_to_come: '',
      date: '',
      time: ''
    })
    this._formService.openForm()
  }
}
