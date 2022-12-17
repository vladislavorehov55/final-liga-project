import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getDataUsers()
  }

  get currentUsers() {
    return this._userService.users
  }
}
