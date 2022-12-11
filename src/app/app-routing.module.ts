import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetupsPageComponent} from "./components/pages/meetups-page/meetups-page.component";
import {AuthPageComponent} from "./components/pages/auth-page/auth-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MeetupsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
