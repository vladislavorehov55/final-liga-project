import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {IUserGetResponse} from "../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
  private _users!: IUserGetResponse[]
  private usersSubscription!: Subscription
  constructor(private _userService: UserService, private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.usersSubscription = this._userService.usersSubject.subscribe((items) => {
      console.log('item', items)
      this._users = items
      this._cdr.detectChanges()
    })
  }

  get users() {
    return this._users
  }

  ngOnDestroy() {
    console.log('users list destroy')
    this.usersSubscription.unsubscribe()
    this._userService.intervalSubscription.unsubscribe()
  }
}
