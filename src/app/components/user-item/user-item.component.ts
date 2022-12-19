import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IUserGetResponse} from "../../models/user";
import {UserService} from "../../services/user/user.service";
import {FormService} from "../../services/form/form.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit{
  @Input()
  user!: IUserGetResponse
  constructor(private _formService: FormService, private _userService: UserService) {
  }
  ngOnInit() {
  }

  openEditUserFormHandler() {
    this._userService.editedUserId = this.user.id
    this._formService.setForm('USER', 'EDIT',
      'Редактирование пользователя',  this.user.roles[0].name,{
      fio: this.user.fio,
      email: this.user.email,
      password: ''
    })
    this._formService.openForm()
  }
  deleteUserHandler() {
    this._userService.deleteUser(this.user.id)
  }

  get changeDetect() {
    console.log('Render user item')
    return ''
  }
}
