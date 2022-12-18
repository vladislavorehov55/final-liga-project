import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.user) {
      for (let role of this._authService.user?.roles) {
        if (role.name === 'ADMIN') {
          return true
        }
      }
    }
    this._router.navigate([''])
    return false;
  }

}
