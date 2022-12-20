import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser, IUserDeleteResponse, IUserGetResponse} from "../../models/user";
import {AuthService} from "../auth/auth.service";
import {IParsedToken} from "../../models/parsedTokem";
import {BehaviorSubject, catchError, interval, mergeMap, Subscription, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}`
  private _errorMessage = 'Произошла ошибка! Пожалуйста перезагурзите страницу.'
  usersSubject = new BehaviorSubject<IUserGetResponse[]>([])
  // userObservable = this.usersSubject.asObservable()
  private _users:IUserGetResponse[] = []
  get users() {
    return this._users
  }
  // Error
  private _usersErrorSubject = new BehaviorSubject<string>('')
  get usersErrorSubject() {
    return this._usersErrorSubject
  }

  //

  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,
              private _authService: AuthService) {
  }

  private _intervalSubscription = new Subscription()
  get intervalSubscription() {
    return this._intervalSubscription
  }
  startInterval() {
    this._intervalSubscription = interval(60000)
      .pipe(
        mergeMap(() => this.getUsersData())
      )
      .subscribe({
        next: (data) => {
          this._users = data
          this.setUsersOnPage(1)
          // this.usersSubject.next(data)
        },
        error: () => {}
      })
  }

  setUsersData() {
    this.getUsersData()
      .subscribe({
        next: (users: IUserGetResponse[]) => {
          this._users = users
          this._intervalSubscription.unsubscribe()
          this.setUsersOnPage(1)
          // this.usersSubject.next(users)
          this.startInterval()

        },
        error: err => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
  }

  getUsersData() {
    console.log('request to users data')
    return this._http.get<IUserGetResponse[]>(`${this._baseURL}/user`)
      .pipe(
        catchError(err => throwError(err))
      )
  }

  addUser(userRole: string, newUser: IUser) {
    this._http.post<{ token: string }>(`${this._baseURL}/auth/registration`, newUser)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: ({token}) => {
          const parsedToken: IParsedToken = this._authService.parseJwt(token)
          if (userRole.toUpperCase() !== 'USER') {
            const body = {
              userId: parsedToken.id,
              names: [userRole]
            }
            this._http.post(`${this._baseURL}/.user/role`, body)
              .pipe(
                catchError(err => throwError('Произошла ошибка! Пользователь создан, но ему не присвоена нужная роль. Перезагрузите страницу.'))
              )
              .subscribe({
                next: (data) => {
                  this.setUsersData()
                },
                error: (err) => {
                  this._usersErrorSubject.error(err)
                }
              })
          } else {
            this.setUsersData()
          }
        },
        error: (err) => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
  }

  deleteUser(id: number) {
    this._http.delete<IUserDeleteResponse>(`${this._baseURL}/user/${id}`)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: (data) => {
          console.log('delete user', data)
          this.setUsersData()
        },
        error: (err) => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
  }

  editedUserId: number | null = null

  updateUser(fio: string, password: string, email: string, userRole: string, userRoleInit: string) {
    const body = {fio, password, email}
    this._http.put(`${this._baseURL}/user/${this.editedUserId}`, body)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: (data: any) => {
          if (userRole !== userRoleInit) {
            const body = {
              userId: data.id,
              names: [userRole]
            }
            this._http.post(`${this._baseURL}/user/role`, body)
              .pipe(
                catchError(err => throwError('Произошла ошибка! Изменить роль не удалось. Перезагрузите страницу.'))
              )
              .subscribe({
                next: data => {
                  this.setUsersData()
                },
                error: (err) => {
                  this._usersErrorSubject.error(err)
                }
              })
          } else {
            this.setUsersData()
          }
        },
        error: (err) => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
  }
  private _itemsOnPage = 5
  get itemOnPage() {
    return this._itemsOnPage
  }
  private _currentPageNumber: number = 1
  get currentPageNumber() {
    return this._currentPageNumber
  }
  setUsersOnPage(newPageNumber: number) {
    const start = (newPageNumber - 1) * this._itemsOnPage;
    const end = start + this._itemsOnPage;
    this._currentPageNumber = newPageNumber
    this.usersSubject.next(this._users.slice(start, end))
  }

}
