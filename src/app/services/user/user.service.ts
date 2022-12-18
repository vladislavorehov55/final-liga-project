import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {IUser, IUserDeleteResponse, IUserGetResponse} from "../../models/user";
import {AuthService} from "../auth/auth.service";
import {IParsedToken} from "../../models/parsedTokem";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseURL: string = `${this._environmentService.environment.apiUrl}`
  private _users!: IUserGetResponse[]


  get users() {
    return this._users
  }
  constructor(private _http: HttpClient, private _environmentService: EnvironmentService,
              private _authService: AuthService) {
  }

  getDataUsers() {
    this._http.get<IUserGetResponse[]>(`${this._baseURL}/user`)
      .subscribe((users: IUserGetResponse[]) => {
        this._users = users
        console.log('users', users)
      })
  }
  addUser(userRole: string, newUser: IUser) {
    this._http.post<{token: string}>(`${this._baseURL}/auth/registration`, newUser)
      .subscribe(({token}) => {
        const parsedToken: IParsedToken = this._authService.parseJwt(token)
        if (userRole.toUpperCase() !== 'USER') {
          const body = {
            userId: parsedToken.id,
            names: [userRole]
          }
          this._http.post(`${this._baseURL}/user/role`, body)
            .subscribe(data => {
              this.getDataUsers()
            })
        }
        else {
          this.getDataUsers()
        }
      })
  }
  deleteUser(id: number) {
    this._http.delete<IUserDeleteResponse>(`${this._baseURL}/user/${id}`)
      .subscribe((data) => {
        console.log('delete user', data)
        this.getDataUsers()
      })
  }
  editedUserId: number | null = null
  updateUser(fio: string, password: string, email: string, userRole: string, userRoleInit: string) {
    const body = password ? {fio, password, email} : {fio, email}
    this._http.put(`${this._baseURL}/user/${this.editedUserId}`, body)
      .subscribe((data: any) => {

        if (userRole !== userRoleInit) {
          const body = {
            userId: data.id,
            names: [userRole]
          }
          this._http.post(`${this._baseURL}/user/role`, body)
            .subscribe(data => {
              this.getDataUsers()
            })
        }
        else {
          this.getDataUsers()
        }
      })

  }

}
