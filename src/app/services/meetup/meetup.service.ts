import { Injectable } from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable()
export class MeetupService {
  meetups: Array<IMeetup> = []
  constructor(private environmentService: EnvironmentService, private http: HttpClient) {
  }

  getDataMeetups() {
    this.http.get<IMeetup[]>(`${this.environmentService.environment.apiUrl}/meetup`)
      .pipe(
        map(meetups => {
          return meetups.map(meetup => ({...meetup, isOpened: false}))
        })
      )
      .subscribe((data) => {
        this.meetups = data
      })
  }

  setMeetupOpened(id: number) {
    this.meetups = this.meetups.map(meetup => {
      if (meetup.id === id) {
        meetup.isOpened = !meetup.isOpened
      }
      return meetup
    })
  }
}
