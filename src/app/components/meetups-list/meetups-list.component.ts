import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MeetupService} from "../../services/meetup/meetup.service";
import {IMeetup} from "../../models/meetup";

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsListComponent implements OnInit {
  constructor(private _meetupService: MeetupService, private _cdr: ChangeDetectorRef) {}

  currentMeetups: IMeetup[] = []
  ngOnInit() {
    this._meetupService.getDataMeetups()
    this._meetupService.meetupsSubject.subscribe(items => {
      console.log('subscribe', items)
      this.currentMeetups = items
      this._cdr.detectChanges()
    })
  }

  // get currentMeetups() {
  //   return this._meetupService.searchedMeetups ? this._meetupService.searchedMeetups : this._meetupService.meetups
  // }
}
