import {Component, Input, OnInit} from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {MeetupService} from "../../services/meetup/meetup.service";

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss']
})
export class MeetupItemComponent implements OnInit{
  constructor(private _meetupService: MeetupService) {}
  ngOnInit() {
  }
  @Input()
  meetup!: IMeetup

  setOpened(id: number) {
    this._meetupService.setMeetupOpened(id)
  }
}
