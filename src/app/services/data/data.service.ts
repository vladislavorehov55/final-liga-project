import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUserResponse} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}`

  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,) { }
  getData() {
    this._http.get<IUserResponse[]>(`${this._baseURL}`)
      .subscribe((users: IUserResponse[]) => {
        console.log('users', users)
      })
  }
}
