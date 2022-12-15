import { Component } from '@angular/core';
import {FormMeetupService} from "../../../services/form-meetup/form-meetup.service";

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss']
})
export class MeetupsPageComponent {
  constructor(private _formMeetupService: FormMeetupService) {
  }

  openFormHandler() {
    this._formMeetupService.openForm()
  }
}
