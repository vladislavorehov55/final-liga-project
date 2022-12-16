import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IMeetup, MeetupStatusEnum} from "../../models/meetup";
import {MeetupService} from "../../services/meetup/meetup.service";
import {AuthService} from "../../services/auth/auth.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";
import {FormMeetupService} from "../../services/form-meetup/form-meetup.service";

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupItemComponent implements OnInit{


  get isConducted() {
    if (this.meetup.status === MeetupStatusEnum.CONDUCTED) {
      return true
    }
    return false
  }

  constructor(private _meetupService: MeetupService,
              private _authService: AuthService,
              private _router: Router,
              private _formMeetupService: FormMeetupService) {}
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
    switch (this.meetup.status) {
      case MeetupStatusEnum.PLANNED:
        return this.meetup.location
      case MeetupStatusEnum.IN_PROGRESS:
        return 'Идет'
      case MeetupStatusEnum.CONDUCTED:
        return 'Проведен'
    }
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
  editMeetupHandler() {
    this._formMeetupService.editedMeetupID = this.meetup.id
    this._formMeetupService.isShow = true
    const {name, description, duration, location, target_audience, need_to_know,
      will_happen, reason_to_come, time } = this.meetup
    const arr = new Date(time).toLocaleString().split(', ')
    this._formMeetupService.setForm(false, 'Редактирвоание митапа', {
      name, description, duration, location, target_audience, need_to_know,
      will_happen, reason_to_come, date: arr[0], time: arr[1].slice(0, 5)
    })
  }
}
