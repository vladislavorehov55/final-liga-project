import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {FormService} from "../../../services/form/form.service";
import {UserService} from "../../../services/user/user.service";
import {Subscription} from "rxjs";
import {IUserGetResponse} from "../../../models/user";
import {RoleService} from "../../../services/role/role.service";
import {IRole} from "../../../models/role";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy{
  private _serverError: string = ''
  private _errorSubscription = new Subscription()
  private _users!: IUserGetResponse[]
  private usersSubscription!: Subscription

  constructor(private _formService: FormService,
              private _userService: UserService,
              private _cdr: ChangeDetectorRef,
              private _roleService: RoleService) {
  }
  get serverError() {
    return this._serverError
  }
  get users() {
    return this._users
  }
  get itemsOnPage() {
    return this._userService.itemOnPage
  }
  get totalUsers() {
    return this._userService.currentUsersAllCount
  }
  get currentPageNumber() {
    return this._userService.currentPageNumber
  }

  get roles() {
    return this._roleService.roles.map((role) => role.name)
  }

  ngOnInit() {
    console.log('init users page')
    this._roleService.getDataRoles()
    this._userService.setUsersData()
    this._errorSubscription = this._userService.usersErrorSubject.subscribe({
      error: (err) => {
        console.log('error', err)
        this._serverError = err
        this._cdr.detectChanges()
      },
    })
    this.usersSubscription = this._userService.usersSubject.subscribe((items) => {
      console.log('item', items)
      this._users = items
      this._cdr.detectChanges()
    })

  }
  ngOnDestroy() {
    console.log('Destroy users page')
    this._errorSubscription.unsubscribe()
    this.usersSubscription.unsubscribe()
    this._userService.intervalSubscription.unsubscribe()
  }

  openUserCreationForm() {
    this._formService.setForm('USER', 'ADD','Создание пользователя', 'user',{
      fio: '',
      email: '',
      password: ''
    })
    this._formService.openForm()
  }

  changePageHandler(newPage: number) {
    this._userService.setUsersOnPage(newPage)
  }
}
