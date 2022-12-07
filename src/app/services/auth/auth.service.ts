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
}
