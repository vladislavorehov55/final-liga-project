import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {MeetupService} from "../../services/meetup/meetup.service";
import {IMeetup} from "../../models/meetup";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsListComponent implements OnInit, OnDestroy {
  constructor(private _meetupService: MeetupService, private _cdr: ChangeDetectorRef) {}
  private _meetupsSubscription!: Subscription
  currentMeetups: IMeetup[] = []
  private _serverError: string = ''
  get serverError() {
    return this._serverError
  }
  ngOnInit() {
    this._meetupService.getDataMeetups()
    this._meetupsSubscription = this._meetupService.meetupsSubject.subscribe({
      next: (items) => {
        console.log('subscribe', items)
        this.currentMeetups = items
        this._cdr.detectChanges()
      },
      error: (err) => {
        this._serverError = err
        this._cdr.detectChanges()
      }
    })
  }
  ngOnDestroy() {
    this._meetupsSubscription.unsubscribe()
  }


}
