import {Injectable} from '@angular/core';
import {IMeetup, IMeetupResponse, MeetupStatusEnum} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {concatAll, map, toArray} from "rxjs";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {FormGroup} from "@angular/forms";
import {IParsedToken} from "../../models/parsedTokem";

@Injectable()
export class MeetupService {
  private _baseURL: string = `${this.environmentService.environment.apiUrl}`
  private _meetups: Array<IMeetup> = []
  get meetups() {
    console.log('all meetups', this._meetups)
    if (this._router.url === '/my-meetups') {
      return this._meetups.filter(meetup => meetup.isOweCurrentUser)
    }
    return this._meetups
  }

  constructor(private environmentService: EnvironmentService, private http: HttpClient, private _router: Router, private _authService: AuthService) {
  }
  private _getMeetupStatus(meetupTime: string, duration: number): MeetupStatusEnum {
    const meetupStart = Date.parse(meetupTime)
    const meetupEnd = meetupStart + duration * 60000
    const currentDate = Date.now()
    if (currentDate > meetupEnd) {
      return MeetupStatusEnum.CONDUCTED
    }
    else if (meetupStart <= currentDate && currentDate <= meetupEnd) {
      return MeetupStatusEnum.IN_PROGRESS
    }
    else {
      return MeetupStatusEnum.PLANNED
    }
  }
  getDataMeetups() {
    this.http.get<IMeetupResponse[]>(`${this._baseURL}/meetup`)
      .pipe(
        concatAll(),
        map((meetup:IMeetupResponse) => {
          const newMeetup: IMeetup = {
            ...meetup,
            status: this._getMeetupStatus(meetup.time, meetup.duration),
            isOpened: false,
            isOweCurrentUser: this._authService.user?.id === meetup.createdBy
          }
          return newMeetup
        }),
        toArray()
      )
      .subscribe((data: IMeetup[]) => {
        this._meetups = data
      })
  }

  setMeetupOpened(id: number) {
    this._meetups = this.meetups.map(meetup => {
      if (meetup.id === id) {
        meetup.isOpened = !meetup.isOpened
      }
      return meetup
    })
  }

  subscribe(idMeetup: number, idUser: number) {
    this.http.put<IMeetupResponse>(`${this._baseURL}/meetup`, {idMeetup, idUser})
      .pipe(
        map((meetup) => {
          const user: IParsedToken = this._authService.user as IParsedToken
          for (let i = 0; i < this.meetups.length; i++) {
            if (this.meetups[i].id === meetup.id) {
              this.meetups[i] = {
                ...meetup,
                isOpened: false,
                status: this._getMeetupStatus(meetup.time, meetup.duration),
                isOweCurrentUser: user.id === meetup.createdBy
              }
              break
            }
          }
          return this.meetups
        })
      )
      .subscribe((data) => this._meetups = data)
  }

  unsubscribe(idMeetup: number, idUser: number) {
    this.http.delete<IMeetupResponse>(`${this._baseURL}/meetup`, {
      body: {idMeetup, idUser}
    })
      .pipe(
        map((meetup) => {
          const user: IParsedToken = this._authService.user as IParsedToken
          for (let i = 0; i < this.meetups.length; i++) {
            if (this.meetups[i].id === meetup.id) {
              this.meetups[i] = {
                ...meetup,
                isOpened: false,
                status: this._getMeetupStatus(meetup.time, meetup.duration),
                isOweCurrentUser: user.id === meetup.createdBy
              }
              break
            }
          }
          return this.meetups
        })
      )
      .subscribe((data: IMeetup[]) => this._meetups = data)
  }

  deleteMeetup(meetupID: number) {
    this.http.delete<IMeetupResponse>(`${this._baseURL}/meetup/${meetupID}`)
      .subscribe(() => {
        this.getDataMeetups()
      })
  }

  private _getMeetUpToRequest(form: FormGroup) {
    const timeComponents: [number, number, number, number, number] = [0, 0, 0, 0, 0]
    timeComponents.splice(0, 3, ...form.value['date'].split('.').reverse().map((item: string) => +item))
    timeComponents.splice(3, 2, ...form.value['time'].split(':').map((item: string) => +item))
    timeComponents[1] = timeComponents[1] - 1
    const {
      name,
      description,
      location,
      duration,
      target_audience,
      need_to_know,
      will_happen,
      reason_to_come
    } = form.value
    return {
      name, description, location, duration, target_audience,
      need_to_know, will_happen, reason_to_come, time: new Date(...timeComponents).toISOString()
    }
  }

  editMeetup(meetupID: number, form: FormGroup) {
    const editedMeetUp = this._getMeetUpToRequest(form)
    this.http.put<IMeetupResponse>(`${this._baseURL}/meetup/${meetupID}`, editedMeetUp)
      .subscribe(meetup => {
        this.getDataMeetups()
      })
  }

  private _searchedMeetups: IMeetup[] | null = null

  get searchedMeetups() {
    return this._searchedMeetups
  }
  set searchedMeetups(newMeetups) {
    this._searchedMeetups = newMeetups
  }

  searchMeetups(value: string) {
    if (value === '') {
      this.searchedMeetups = null
      return
    }
    this.searchedMeetups = this.meetups.filter(meetup => {
      return meetup.name.includes(value) || meetup.description.includes(value) ||
        meetup.location.includes(value) || meetup.duration === +value ||
        meetup.target_audience.includes(value) || meetup.will_happen.includes(value) ||
        meetup.need_to_know.includes(value) || meetup.reason_to_come.includes(value) ||
        new Date(this.meetups[0].time).toLocaleDateString('ru',
          {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}).includes(value)
    })
  }


}
