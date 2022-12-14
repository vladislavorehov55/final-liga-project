import { Component, OnInit } from '@angular/core';
import {FormMeetupService} from "../../services/form-meetup/form-meetup.service";
import {FormControl, FormGroup} from "@angular/forms";


export interface IFormFields {
  name: string
  date: string
  time: string
  place: string
  description: string
  audience: string
  knowledge: string
  happen: string,
  duration: number
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
      place: new FormControl(this.formMeetupService.formFieldsValue.place),
      description: new FormControl(this.formMeetupService.formFieldsValue.description),
      audience: new FormControl(this.formMeetupService.formFieldsValue.audience),
      knowledge: new FormControl(this.formMeetupService.formFieldsValue.knowledge),
      happen: new FormControl(this.formMeetupService.formFieldsValue.happen),
      duration: new FormControl(this.formMeetupService.formFieldsValue.duration)
    })
  }
}
