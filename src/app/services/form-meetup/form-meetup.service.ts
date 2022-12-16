import {Injectable} from '@angular/core';
import {IFormFields} from "../../components/form-meetup/form-meetup.component";
import {IMeetup} from "../../models/meetup";
import {map, tap} from "rxjs";
import {EnvironmentService} from "../environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {MeetupService} from "../meetup/meetup.service";
import {IMeetupAddFieldsReq} from "../../models/meetup-add-fields-req";

@Injectable({
  providedIn: 'root'
})
export class FormMeetupService {
  private _title: string = 'Создание митапа'
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
  private _isCreating: boolean = true
  isShow: boolean = false

  constructor(private environmentService: EnvironmentService, private http: HttpClient,
              private meetupService: MeetupService) {
  }
  get title() {
    return this._title
  }
  set title(newTitle: string) {
    this._title = newTitle
  }

  get isCreating() {
    return this._isCreating
  }
  set isCreating(flag: boolean) {
    this._isCreating = flag
  }



  setFormMeetupContent(title: string, formFieldsValue: IFormFields) {
    console.log('formFieldsValue', formFieldsValue)
    this.title = title
    this.formFieldsValue = formFieldsValue
  }
  closeForm() {
    this.isShow = false
  }
  openForm() {
    this.isShow = true
  }

  addMeetup(meetup: IMeetupAddFieldsReq) {
    this.http.post<IMeetup>(`${this.environmentService.environment.apiUrl}/meetup`, {...meetup})
      .subscribe(data => this.meetupService.getDataMeetups())
  }

}

