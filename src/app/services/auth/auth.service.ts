import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../environment/environment.service";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  baseUrl: string = `${this.environmentService.environment.apiUrl}/auth`

  constructor(private environmentService: EnvironmentService, private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    this.http.post<{ token: string }>(`${this.baseUrl}/login`, {email, password})
      .pipe(
        map((res) => {
          if (res.token) {
            localStorage.setItem('meetups_app_auth_token', res.token)
            return res.token
          }
          return null
        })
      ).subscribe((token) => {
        if (token) {
          this.router.navigate([''])
        }
    })
  }
  logout() {
    localStorage.removeItem('meetups_app_auth_token')
    this.router.navigate(['auth'])
  }
  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
  get user() {
    const token = localStorage.getItem('meetups_app_auth_token')
    if (token) {
      return this.parseJwt(token)
    }
    return null
  }
}
