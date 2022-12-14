import {Injectable} from '@angular/core';
import {IFormFields} from "../../components/form-meetup/form-meetup.component";
import {IMeetup} from "../../models/meetup";
import {map} from "rxjs";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {MeetupService} from "../meetup/meetup.service";
import {IMeetupAddFieldsReq} from "../../models/meetup-add-fields-req";

@Injectable()
export class FormMeetupService {
  title: string = 'Создание митапа'
  formFieldsValue: IFormFields = {
    name: '',
    date: '',
    time: '',
    place: '',
    description: '',
    audience: '',
    knowledge: '',
    happen: '',
    duration: 90
  }
  isCreating: boolean = true
  isShow: boolean = true

  constructor(private environmentService: EnvironmentService, private http: HttpClient,
              private meetupService: MeetupService) {
  }

  setFormMeetupContent(title: string, formFieldsValue: IFormFields) {
    this.title = title
    this.formFieldsValue = formFieldsValue
  }
  closeForm() {
    this.isShow = false
  }

  addMeetup(meetup: IMeetupAddFieldsReq) {
    this.http.post<IMeetup[]>(`${this.environmentService.environment.apiUrl}/meetup`, {...meetup})
      .pipe(
        map(meetups => {
          return meetups.map(meetup => ({...meetup, isOpened: false}))
        })
      )
      .subscribe(data => this.meetupService.updateMeetups(data))
  }

}
