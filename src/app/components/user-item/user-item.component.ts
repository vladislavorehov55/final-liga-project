import {Component, Input, OnInit} from '@angular/core';
import {IUser, IUserResponse} from "../../models/user";
import {UserService} from "../../services/user/user.service";
import {FormService} from "../../services/form/form.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit{
  @Input()
  user!: IUserResponse
  constructor(private _formService: FormService) {
  }
  ngOnInit() {
  }

  openEditUserFormHandler() {
    this._formService.isShow = true
    this._formService.setUserForm('EDIT_USER', 'Редактирование пользователя', {
      fio: this.user.fio,
      email: this.user.email,
      password: this.user.password
    })
  }
}
