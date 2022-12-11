import {Component, Input, OnInit} from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {MeetupService} from "../../services/meetup/meetup.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss']
})
export class MeetupItemComponent implements OnInit{
  constructor(private _meetupService: MeetupService, private _authService: AuthService) {}
  ngOnInit() {
  }
  @Input()
  meetup!: IMeetup

  setOpened(id: number) {
    this._meetupService.setMeetupOpened(id)
  }
  willGo(): boolean {
    const subscribedUsers  = this.meetup.users
    for (let user of subscribedUsers) {
      // @ts-ignore
      if (user.id === this._authService.user.id) return true
    }
    return false
  }
}
