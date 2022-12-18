import {Injectable} from '@angular/core';
import {IMeetup, IMeetupResponse, MeetupStatusEnum} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, concatAll, map, Subscription, toArray} from "rxjs";
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
  meetupsSubject = new BehaviorSubject<IMeetup[]>([])
  meetupsObservable = this.meetupsSubject.asObservable()
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
        this.meetupsSubject.next(this.meetups)
      })
  }

  setMeetupOpened(id: number) {
    const meetups = this.meetups.map(meetup => {
      if (meetup.id === id) {
        meetup.isOpened = !meetup.isOpened
      }
      return meetup
    })
    this._meetups = meetups
    this.meetupsSubject.next(meetups)
  }

  subscribe(idMeetup: number, idUser: number) {
    this.http.put<IMeetupResponse>(`${this._baseURL}/meetup`, {idMeetup, idUser})
      .pipe(
        map((meetup) => {
          const user: IParsedToken = this._authService.user as IParsedToken
          const currentMeetups = this.meetups
          for (let i = 0; i < currentMeetups.length; i++) {
            if (currentMeetups[i].id === meetup.id) {
              currentMeetups[i] = {
                ...meetup,
                isOpened: false,
                status: this._getMeetupStatus(meetup.time, meetup.duration),
                isOweCurrentUser: user.id === meetup.createdBy
              }
              break
            }
          }
          return currentMeetups
        })
      )
      .subscribe((data) => {
        this._meetups = data
        this.meetupsSubject.next(data)
      })
  }

  unsubscribe(idMeetup: number, idUser: number) {
    this.http.delete<IMeetupResponse>(`${this._baseURL}/meetup`, {
      body: {idMeetup, idUser}
    })
      .pipe(
        map((meetup) => {
          const user: IParsedToken = this._authService.user as IParsedToken
          const currentMeetups = this.meetups
          for (let i = 0; i < currentMeetups.length; i++) {
            if (currentMeetups[i].id === meetup.id) {
              currentMeetups[i] = {
                ...meetup,
                isOpened: false,
                status: this._getMeetupStatus(meetup.time, meetup.duration),
                isOweCurrentUser: user.id === meetup.createdBy
              }
              break
            }
          }
          return currentMeetups
        })
      )
      .subscribe((data: IMeetup[]) => {
        this._meetups = data
        this.meetupsSubject.next(data)
      })
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

  searchMeetups(value: string) {
    if (value === '') {
      this.meetupsSubject.next(this.meetups)
      return
    }
    const searchedMeetups = this.meetups.filter(meetup => {
      return meetup.name?.toLowerCase().includes(value) || meetup.description?.includes(value) ||
        meetup.location?.toLowerCase().includes(value) || (meetup.duration || null) === +value ||
        meetup.target_audience?.toLowerCase().includes(value) || meetup.will_happen?.toLowerCase().includes(value) ||
        meetup.need_to_know?.toLowerCase().includes(value) || meetup.reason_to_come?.toLowerCase().includes(value) ||
        (meetup.time ? new Date(meetup.time).toLocaleDateString('ru',
          {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}).includes(value) : null)
    })
    this.meetupsSubject.next(searchedMeetups)
  }
}
