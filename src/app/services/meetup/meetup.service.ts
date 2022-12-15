import {Injectable} from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {concatAll, from, map, tap, toArray} from "rxjs";
import {IFormFields} from "../../components/form-meetup/form-meetup.component";
import {
  toR3ClassMetadata
} from "@angular/compiler-cli/linker/src/file_linker/partial_linkers/partial_class_metadata_linker_1";

@Injectable()
export class MeetupService {
  private _meetups: Array<IMeetup> = []
  get meetups() {
    return this._meetups
  }
  constructor(private environmentService: EnvironmentService, private http: HttpClient) {
  }

  getDataMeetups() {
    this.http.get<IMeetup[]>(`${this.environmentService.environment.apiUrl}/meetup`)
      .pipe(
        concatAll(),
        map(meetup => ({...meetup, isOpened: false})),
        toArray()
      )
      .subscribe((data) => {
        console.log('meetups', data)
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
