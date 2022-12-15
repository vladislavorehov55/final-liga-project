import {Component, Input, OnInit} from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {MeetupService} from "../../services/meetup/meetup.service";
import {AuthService} from "../../services/auth/auth.service";
import {IUser} from "../../models/user";

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
  get subscribersCount() {
    return this.meetup.users.length
  }
  get meetupTime() {
    return this.meetup.time
  }
  setOpened(id: number) {
    this._meetupService.setMeetupOpened(id)
  }
  willGo(): boolean {
    const subscribedUsers  = this.meetup.users
    for (let user of subscribedUsers) {
      // @ts-ignore
      if (user.id === this._authService.user.id) {
        return false
      }
    }
    return true
  }
  subscribe(idMeetup: number, idUser: number) {
    this._meetupService.subscribe(idMeetup, idUser)
  }
  unsubscribe(idMeetup: number, idUser: number) {
    this._meetupService.unsubscribe(idMeetup, idUser)
  }
  get user() {
    return this._authService.user as IUser
  }
}
