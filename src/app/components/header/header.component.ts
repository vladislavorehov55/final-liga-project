import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {IParsedToken} from "../../models/parsedTokem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy{

  user: IParsedToken | null = null
  constructor(private _authService: AuthService, private _cdr: ChangeDetectorRef,
              private _router: Router) {
  }

  ngOnInit() {
    this._authService.userSubject.subscribe({
      next: user => {
        this.user = user
        this._cdr.detectChanges()
      }
    })
  }

  logoutHandler() {
    this._authService.logout()
  }

  canGetUsersLink() {
    if (this.user) {
      for (let role of this.user.roles) {
        if (role.name === 'ADMIN') {
          return true
        }
      }
    }
    return  false
  }

  userIconClickHandler() {
    if (this._router.url === '/auth') {
      return
    }
    this._router.navigate(['auth'])
  }

  ngOnDestroy() {
    this._authService.userSubject.unsubscribe()
  }
}
