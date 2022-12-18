import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormService} from "../../../services/form/form.service";

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrls: ['./meetups-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent {
  constructor(private _formService: FormService) {
  }

  openFormHandler() {

    this._formService.isShow = true
    console.log('ma')
    this._formService.setForm('MEETUP', 'ADD',  'Создания митапа', '', {
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
