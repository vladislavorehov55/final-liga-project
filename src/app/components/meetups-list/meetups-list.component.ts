import { Component } from '@angular/core';
import {MeetupService} from "../../servcies/meetup.service";

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss']
})
export class MeetupsListComponent {
  constructor(private _meetupService: MeetupService) {}

  get meetups() {
    return this._meetupService.meetups
  }
}
