import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}/user`
  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,) { }

  getDataUsers() {
    this._http.get<IUser[]>(`${this._baseURL}`)
      .subscribe((users: IUser[]) => {
        console.log('users', users)
      })
  }
}
