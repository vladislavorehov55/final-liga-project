import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IRole} from "../../models/role";
import {concatAll, filter, tap, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}/role`
  private _roles:IRole[] = []
  constructor(private _http: HttpClient, private _environmentService: EnvironmentService) {
  }
  get roles() {
    return this._roles
  }

  getDataRoles() {
    this._http.get<IRole[]>(`${this._baseURL}`)
      .pipe(
        concatAll(),
        filter((role: IRole) => role.name !== ''),
        toArray()
      )
      .subscribe((data: IRole[]) => {
        console.log('roles', data)
        this._roles = data
      })
  }

}
