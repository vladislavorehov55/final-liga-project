import {Injectable} from '@angular/core';
import {IMeetup, MeetupStatusEnum} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {concatAll, from, map, tap, toArray} from "rxjs";
import {IFormFields} from "../../components/form-meetup/form-meetup.component";
import {
  toR3ClassMetadata
} from "@angular/compiler-cli/linker/src/file_linker/partial_linkers/partial_class_metadata_linker_1";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class MeetupService {
  private _meetups: Array<IMeetup> = []
  get meetups() {
    if (this._router.url === '/my-meetups') {
      const {id} = this._authService.user as IUser
      return this._meetups.filter(meetup => meetup.owner.id === id)
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
        console.log('meetups', data)
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


}
