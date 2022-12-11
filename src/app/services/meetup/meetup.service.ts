import { Injectable } from '@angular/core';
import {IMeetup} from "../../models/meetup";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MeetupService {
  meetups: Array<IMeetup> = []
  constructor(private environmentService: EnvironmentService, private http: HttpClient) {
  }

  getDataMeetups() {
    this.http.get<IMeetup[]>(`${this.environmentService.environment.apiUrl}/meetup`)
      .subscribe((data) => {
        this.meetups = data
      })
  }
}
