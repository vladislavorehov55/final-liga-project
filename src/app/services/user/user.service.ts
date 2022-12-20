import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser, IUserDeleteResponse, IUserGetResponse} from "../../models/user";
import {AuthService} from "../auth/auth.service";
import {IParsedToken} from "../../models/parsedTokem";
import {BehaviorSubject, catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}`
  private _errorMessage = 'Произошла ошибка! Пожалуйста перезагурзите страницу'
  usersSubject = new BehaviorSubject<IUserGetResponse[]>([])
  // userObservable = this.usersSubject.asObservable()

  // Error
  private _usersErrorSubject = new BehaviorSubject<string>('')
  get usersErrorSubject() {
    return this._usersErrorSubject
  }

  //

  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,
              private _authService: AuthService) {
  }

  getUsersData() {
    this._http.get<IUserGetResponse[]>(`${this._baseURL}/user`)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe({
        next: (users: IUserGetResponse[]) => {
          // this._users = users
          this.usersSubject.next(users)
        },
        error: err => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
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
                  this.getUsersData()
                },
                error: (err) => {
                  this._usersErrorSubject.error(err)
                }
              })
          } else {
            this.getUsersData()
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
          this.getUsersData()
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
                  this.getUsersData()
                },
                error: (err) => {
                  this._usersErrorSubject.error(err)
                }
              })
          } else {
            this.getUsersData()
          }
        },
        error: (err) => {
          this._usersErrorSubject.error(this._errorMessage)
        }
      })
  }

}
