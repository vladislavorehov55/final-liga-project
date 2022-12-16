import { Component, OnInit } from '@angular/core';
import {MeetupService} from "../../services/meetup/meetup.service";

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss']
})
export class MeetupsListComponent implements OnInit {
  constructor(private _meetupService: MeetupService) {}

  ngOnInit() {
    this._meetupService.getDataMeetups()
  }

  get currentMeetups() {
    return this._meetupService.searchedMeetups ? this._meetupService.searchedMeetups : this._meetupService.meetups
  }
}
