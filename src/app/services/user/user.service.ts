import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser, IUserResponse} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}/user`
  private _users!: IUserResponse[]


  get users() {
    return this._users
  }
  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,) {
  }

  getDataUsers() {
    this._http.get<IUserResponse[]>(`${this._baseURL}`)
      .subscribe((users: IUserResponse[]) => {
        this._users = users
        console.log('users', users)
      })
  }
}
