import {Injectable} from '@angular/core';
import {IMeetup, IMeetupResponse, MeetupStatusEnum} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, throwError, concatAll, map, toArray, interval, mergeMap, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {FormGroup} from "@angular/forms";
import {IParsedToken} from "../../models/parsedTokem";
import {IMeetupAddFieldsReq} from "../../models/meetup-add-fields-req";

@Injectable()
export class MeetupService {
  private _baseURL: string = `${this.environmentService.environment.apiUrl}`
  private _meetups: Array<IMeetup> = []
  editedMeetupID: number | null = null

  get meetups() {
    console.log('all meetups', this._meetups)
    if (this._router.url === '/my-meetups') {
      return this._meetups.filter(meetup => meetup.isOweCurrentUser)
    }
    return this._meetups
  }

  meetupsSubject = new BehaviorSubject<IMeetup[]>([])

  constructor(private environmentService: EnvironmentService, private http: HttpClient, private _router: Router, private _authService: AuthService) {
  }

  private _getMeetupStatus(meetupTime: string, duration: number): MeetupStatusEnum {
    const meetupStart = Date.parse(meetupTime)
    const meetupEnd = meetupStart + duration * 60000
    const currentDate = Date.now()
    if (currentDate > meetupEnd) {
      return MeetupStatusEnum.CONDUCTED
    } else if (meetupStart <= currentDate && currentDate <= meetupEnd) {
      return MeetupStatusEnum.IN_PROGRESS
    } else {
      return MeetupStatusEnum.PLANNED
    }
  }

  // Error
  private _meetupsErrorSubject = new BehaviorSubject<string>('')
  get meetupsErrorSubject() {
    return this._meetupsErrorSubject
  }

  ///
  private _intervalSubscription = new Subscription()
  get intervalSubscription() {
    return this._intervalSubscription
  }
  startInterval() {
    this._intervalSubscription = interval(60000)
      .pipe(
        mergeMap(() => this.getDataMeetups())
      )
      .subscribe({
        next: (data: IMeetup[]) => {
          this._meetups = data
          this.meetupsSubject.next(this.meetups)
        },
        error: (err) => {
        }
      })
  }

  setDataMeetups() {
    this.getDataMeetups().subscribe({
      next: (data: IMeetup[]) => {
        this._intervalSubscription.unsubscribe()
        this._meetups = data
        this.setMeetupsOnPage(1)
        // this.meetupsSubject.next(this.meetups)
        this.startInterval()
      },
      error: (err) => {
        this._meetupsErrorSubject.error('Произошла критическая ошибка. Работа с митапами невозможна. Пожалуйста, перезагрузите страницу.')
        this._intervalSubscription.unsubscribe()
      }
    })
  }

  getDataMeetups() {
    return this.http.get<IMeetupResponse[]>(`${this._baseURL}/meetup`)
      .pipe(
        catchError(err => throwError(err)),
        concatAll(),
        map((meetup: IMeetupResponse) => {
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
        catchError(err => throwError(err)),
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
      .subscribe({
        next: (data) => {
          this._meetups = data
          this.setMeetupsOnPage(this._currentPageNumber)
        },
        error: err => {
          this._meetupsErrorSubject.error('Произошла ошибка! Пожалуйста перезагрузите страницу')
        }
      })

  }

  unsubscribe(idMeetup: number, idUser: number) {
    this.http.delete<IMeetupResponse>(`${this._baseURL}/meetup`, {
      body: {idMeetup, idUser}
    })
      .pipe(
        catchError(err => throwError(err)),
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
      .subscribe({
        next: (data: IMeetup[]) => {
          this._meetups = data
          this.setMeetupsOnPage(this._currentPageNumber)
        },
        error: (err) => {
          this._meetupsErrorSubject.error('Произошла ошибка! Пожалуйста перезагрузите страницу')
        }
      })
  }

  addMeetup(meetup: IMeetupAddFieldsReq) {
    this.http.post<IMeetup>(`${this._baseURL}/meetup`, meetup)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: (data) => {
          this.setDataMeetups()
        },
        error: (err) => {
          this._meetupsErrorSubject.error('Произошла ошибка! Пожалуйста перезагрузите страницу')
        }
      })
  }

  deleteMeetup(meetupID: number) {
    this.http.delete<IMeetupResponse>(`${this._baseURL}/meetup/${meetupID}`)
      .pipe(
        catchError(err => throwError(err)),
      )
      .subscribe({
        next: () => {
          this.setDataMeetups()
        },
        error: (err) => {
          this._meetupsErrorSubject.error('Произошла ошибка! Пожалуйста перезагрузите страницу')
        }
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

  editMeetup(form: FormGroup) {
    const editedMeetUp = this._getMeetUpToRequest(form)
    this.http.put<IMeetupResponse>(`${this._baseURL}/meetup/${this.editedMeetupID}`, editedMeetUp)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: (meetup) => {
          this.setDataMeetups()
        },
        error: err => {
          this._meetupsErrorSubject.error('Произошла ошибка! Пожалуйста перезагрузите страницу')
        }
      })
  }
  private _searchedMeetups: IMeetup[] | null = null
  searchMeetups(value: string) {
    if (value === '') {
      // this.meetupsSubject.next(this.meetups)
      this._searchedMeetups = null
      this.setMeetupsOnPage(1)
      return
    }
    this._searchedMeetups = this.meetups.filter(meetup => {
      return meetup.name?.toLowerCase().includes(value) || meetup.description?.includes(value) ||
        meetup.location?.toLowerCase().includes(value) || (meetup.duration || null) === +value ||
        meetup.target_audience?.toLowerCase().includes(value) || meetup.will_happen?.toLowerCase().includes(value) ||
        meetup.need_to_know?.toLowerCase().includes(value) || meetup.reason_to_come?.toLowerCase().includes(value) ||
        (meetup.time ? new Date(meetup.time).toLocaleDateString('ru',
          {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).includes(value) : null)
    })
    this.setMeetupsOnPage(1)
    // this.meetupsSubject.next(searchedMeetups)
  }

  private _itemsOnPage = 5
  get itemOnPage() {
    return this._itemsOnPage
  }
  private _currentPageNumber: number = 1
  get currentPageNumber() {
    return this._currentPageNumber
  }
  get currentAllMeetups() {
    return this._searchedMeetups ? this._searchedMeetups.length : this.meetups.length
  }
  setMeetupsOnPage(newPageNumber: number) {
    const start = (newPageNumber - 1) * this._itemsOnPage;
    const end = start + this._itemsOnPage;
    this._currentPageNumber = newPageNumber
    const currentMeetups = this._searchedMeetups ? this._searchedMeetups : this.meetups
    this.meetupsSubject.next(currentMeetups.slice(start, end))
  }

}
