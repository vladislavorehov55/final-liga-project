import {Injectable} from '@angular/core';
import {IMeetup, MeetupStatusEnum} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {concat, concatAll, filter, from, map, Observable, of, tap, toArray} from "rxjs";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {FormGroup} from "@angular/forms";
import {ajax} from "rxjs/ajax";

@Injectable()
export class MeetupService {
  private _baseURL = `${this.environmentService.environment.apiUrl}`
  private _meetups: Array<IMeetup> = []
  get meetups() {
    console.log('getter meetups',)
    if (this._router.url === '/my-meetups') {
      const {id} = this._authService.user as IUser
      return this._meetups.filter(meetup => {
        return meetup.owner.id === id
      })
    }
    return this._meetups
  }

  constructor(private environmentService: EnvironmentService, private http: HttpClient, private _router: Router, private _authService: AuthService) {
  }

  getDataMeetups() {
    this.http.get<IMeetup[]>(`${this.environmentService.environment.apiUrl}/meetup`)
      .pipe(
        concatAll(),
        map(meetup => ({...meetup, isOpened: false, status: MeetupStatusEnum.PLANNED})),
        toArray()
      )
      .subscribe((data) => {
        this._meetups = data
      })
  }

  updateMeetupStatus(meetupID: number, newStatus: MeetupStatusEnum) {
    for (let i = 0; i < this.meetups.length; i++) {
      if (this.meetups[i].id === meetupID) {
        let meetup = this.meetups[i]
        meetup = {...meetup, status: newStatus}
        break
      }
    }
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
    this.http.put<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup`, {idMeetup, idUser})
      .pipe(
        map((meetup) => {
          for (let i = 0; i < this.meetups.length; i++) {
            if (this.meetups[i].id === meetup.id) {
              this.meetups[i] = meetup
              break
            }
          }
          return this.meetups
        })
      )
      .subscribe((data) => this._meetups = data)
  }

  unsubscribe(idMeetup: number, idUser: number) {
    this.http.delete<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup`, {
      body: {idMeetup, idUser}
    })
      .pipe(
        map((meetup) => {
          for (let i = 0; i < this.meetups.length; i++) {
            if (this.meetups[i].id === meetup.id) {
              this.meetups[i] = meetup
              break
            }
          }
          return this.meetups
        })
      )
      .subscribe((data) => this._meetups = data)
  }

  deleteMeetup(meetupID: number) {
    this.http.delete<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup/${meetupID}`)
      .subscribe(meetup => {
        this._meetups = this.meetups.filter(item => item.id !== meetup.id)
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
    this.http.put<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup/${meetupID}`, editedMeetUp)
      .subscribe(meetup => {
        this.getDataMeetups()
      })
  }


}
