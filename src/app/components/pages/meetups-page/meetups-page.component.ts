import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormMeetupService} from "../../../services/form-meetup/form-meetup.service";

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent {
  constructor(private _formMeetupService: FormMeetupService) {
  }

  openFormHandler() {
    this._formMeetupService.openForm()
    this._formMeetupService.setForm(true, 'Создания митапа', {
      name: '',
      description: '',
      location: '',
      duration: 90,
      target_audience: '',
      will_happen: '',
      need_to_know: '',
      reason_to_come: '',
      date:  '',
      time: ''
    })
  }
}
