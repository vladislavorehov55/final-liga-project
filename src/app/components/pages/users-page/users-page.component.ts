import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {FormService} from "../../../services/form/form.service";
import {UserService} from "../../../services/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy{
  private _serverError: string = ''
  private _errorSubscription = new Subscription()

  constructor(private _formService: FormService,
              private _userService: UserService,
              private _cdr: ChangeDetectorRef) {
  }
  get serverError() {
    return this._serverError
  }
  ngOnInit() {
    console.log('init users page')
    this._userService.setUsersData()
    this._errorSubscription = this._userService.usersErrorSubject.subscribe({
      error: (err) => {
        console.log('error', err)
        this._serverError = err
        this._cdr.detectChanges()
      },
    })
  }
  ngOnDestroy() {
    console.log('Destroy users page')
    this._errorSubscription.unsubscribe()
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
