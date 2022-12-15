import {Injectable} from '@angular/core';
import {IFormFields} from "../../components/form-meetup/form-meetup.component";
import {IMeetup} from "../../models/meetup";
import {map, tap} from "rxjs";
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
    location: '',
    description: '',
    target_audience: '',
    need_to_know: '',
    will_happen: '',
    duration: 90,
    reason_to_come: ''
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
    // this.http.delete(`${this.environmentService.environment.apiUrl}/meetup/96`)
    //   .subscribe(data => console.log(data))

    this.http.post<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup`, {...meetup})
      .subscribe(data => this.meetupService.getDataMeetups())

  }

}

