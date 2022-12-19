import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormService} from "../../../services/form/form.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {

  constructor(private _formService: FormService) {
  }
  openUserCreationForm() {
    this._formService.setForm('USER', 'ADD','Создание пользователя', 'user',{
      fio: '',
      email: '',
      password: ''
    })
    this._formService.openForm()
  }

}
