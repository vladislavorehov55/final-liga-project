import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {EnvironmentService} from "../services/environment/environment.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private environmentService: EnvironmentService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token
    const isApiUrl = request.url.startsWith(this.environmentService.environment.apiUrl)
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {'Authorization': `Bearer ${token}`}
      })
    }
    return next.handle(request);
  }
}
