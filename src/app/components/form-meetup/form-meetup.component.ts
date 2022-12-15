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
  styleUrls: ['./form-meetup.component.scss']
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
    const newMeetup: any = {}
    const timeComponents: [number, number, number, number, number] = [0, 0, 0, 0, 0]
    for (let field in this.form.controls) {
      if (field === 'date') {
        timeComponents.splice(0, 3, ...this.form.controls[field].value.split('.').reverse().map((item: string) => +item))
      }
      else if (field === 'time') {
        timeComponents.splice(3, 2, ...this.form.controls[field].value.split(':').map((item: string) => +item))
      }
      else {
        newMeetup[field] = this.form.controls[field].value
      }
    }
    timeComponents[1] = timeComponents[1] - 1
    newMeetup['time'] = new Date(...timeComponents).toISOString()
    console.log('newMeetup', newMeetup)
    this.formMeetupService.addMeetup(newMeetup)
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
