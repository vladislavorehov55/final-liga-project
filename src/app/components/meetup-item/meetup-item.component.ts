import {Component, Input, OnInit} from '@angular/core';
import {IMeetup, MeetupStatusEnum} from "../../models/meetup";
import {MeetupService} from "../../services/meetup/meetup.service";
import {AuthService} from "../../services/auth/auth.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss']
})
export class MeetupItemComponent implements OnInit{
  meetupStatus = ''

  constructor(private _meetupService: MeetupService, private _authService: AuthService,
              private _router: Router) {}
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

  get contentUnderDate() {
    const meetupID = this.meetup.id
    const meetupStart = Date.parse(this.meetupTime)
    const meetupEnd = meetupStart + this.meetup.duration * 60000
    const currentDate = Date.now()
    if (currentDate > meetupEnd) {
      this._meetupService.updateMeetupStatus(meetupID, MeetupStatusEnum.CONDUCTED)
      return 'Проведен'
    }
    else if (meetupStart <= currentDate && currentDate <= meetupEnd) {
      this._meetupService.updateMeetupStatus(meetupID, MeetupStatusEnum.IN_PROGRESS)
      return 'Идет'
    }
    else if (currentDate < meetupStart) {
      this._meetupService.updateMeetupStatus(meetupID, MeetupStatusEnum.PLANNED)
      return this.meetup.location
    }
    return
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
  get url() {
    return this._router.url
  }
  get user() {
    return this._authService.user as IUser
  }
  subscribe(idMeetup: number, idUser: number) {
    this._meetupService.subscribe(idMeetup, idUser)
  }
  unsubscribe(idMeetup: number, idUser: number) {
    this._meetupService.unsubscribe(idMeetup, idUser)
  }
  deleteMeetupHandler() {
    this._meetupService.deleteMeetup(this.meetup.id)
  }

}
