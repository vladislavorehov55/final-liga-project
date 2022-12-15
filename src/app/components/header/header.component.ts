import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private _authService: AuthService) {
  }

  logoutHandler() {
    this._authService.logout()
  }

  get user() {
    return this._authService.user
  }
}
