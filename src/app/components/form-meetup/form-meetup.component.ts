import { Component, OnInit } from '@angular/core';
import {FormMeetupService} from "../../services/form-meetup/form-meetup.service";
import {FormControl, FormGroup} from "@angular/forms";


export interface IFormFields {
  name: string
  description: string
  date: string
  time: string
  duration: number
  location: string
  target_audience: string
  need_to_know: string
  will_happen: string,
  reason_to_come: string
}

@Component({
  selector: 'app-form-meetup',
  templateUrl: './form-meetup.component.html',
  styleUrls: ['./form-meetup.component.scss'],
  providers: [FormMeetupService]

})
export class FormMeetupComponent implements OnInit{
  form!: FormGroup

  constructor(private formMeetupService: FormMeetupService) {
  }

  get title() {
    return this.formMeetupService.title
  }

  get isCreating() {
    return this.formMeetupService.isCreating
  }

  get isShow() {
    return this.formMeetupService.isShow
  }

  ngOnInit() {
    this._createForm()
  }

  addMeetupHandler() {

  }

  editMeetupHandler() {

  }

  closeFormHandler() {
    this.formMeetupService.closeForm()
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.formMeetupService.formFieldsValue.name),
      date: new FormControl(this.formMeetupService.formFieldsValue.date),
      time: new FormControl(this.formMeetupService.formFieldsValue.time),
      location: new FormControl(this.formMeetupService.formFieldsValue.location),
      description: new FormControl(this.formMeetupService.formFieldsValue.description),
      target_audience: new FormControl(this.formMeetupService.formFieldsValue.target_audience),
      need_to_know: new FormControl(this.formMeetupService.formFieldsValue.need_to_know),
      will_happen: new FormControl(this.formMeetupService.formFieldsValue.will_happen),
      duration: new FormControl(this.formMeetupService.formFieldsValue.duration),
      reason_to_come: new FormControl(this.formMeetupService.formFieldsValue.reason_to_come)
    })
  }
}
