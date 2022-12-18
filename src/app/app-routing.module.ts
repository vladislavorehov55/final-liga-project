import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetupsPageComponent} from "./components/pages/meetups-page/meetups-page.component";
import {AuthPageComponent} from "./components/pages/auth-page/auth-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {UsersPageComponent} from "./components/pages/users-page/users-page.component";
import {UsersGuard} from "./guards/users/users.guard";

const routes: Routes = [
  {
    path: '',
    component: MeetupsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'my-meetups',
    component: MeetupsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [AuthGuard, UsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
