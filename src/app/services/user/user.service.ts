import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser, IUserResponse} from "../../models/user";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}`
  private _users!: IUserResponse[]


  get users() {
    return this._users
  }
  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,
              private _authService: AuthService) {
  }

  getDataUsers() {
    this._http.get<IUserResponse[]>(`${this._baseURL}/user`)
      .subscribe((users: IUserResponse[]) => {
        this._users = users
        console.log('users', users)
      })
  }
  addUser(newUser: IUser) {
    this._http.post<{token: string}>(`${this._baseURL}/auth/registration`, newUser)
      .subscribe(({token}) => {
        const parsedToken = this._authService.parseJwt(token)
        console.log('newUserReq', parsedToken)
        // this._http.post(`${this._baseURL}/user/role`, {
        //
        // })
      })
  }
  deleteUser(id: number) {
    this._http.delete(`${this._baseURL}/user/${id}`)
      .subscribe((data) => {
        console.log('delete user', data)
        this.getDataUsers()
      })
  }

}
