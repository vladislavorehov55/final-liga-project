import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {IUser} from "../../models/user";
import {IParsedToken} from "../../models/parsedTokem";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy{

  user: IParsedToken | null = null
  constructor(private _authService: AuthService, private _cdr: ChangeDetectorRef) {
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

  ngOnDestroy() {
    this._authService.userSubject.unsubscribe()
  }
}
