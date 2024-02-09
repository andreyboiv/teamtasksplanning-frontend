import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {InfoPageComponent} from "./auth/info-page/info-page.component";
import {ActivateAccountComponent} from "./auth/activate-account/activate-account.component";
import {SendEmailResetPassword} from "./auth/reset-password/send-email/send-email-reset-password.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo: '', pathMatch: 'full'},
  {path: 'index', redirectTo: '', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'info-page', component: InfoPageComponent, pathMatch: 'full'},
  {path: 'activate-account/:uuid', component: ActivateAccountComponent, pathMatch: 'full'},
  {path: 'reset-password', component: SendEmailResetPassword, pathMatch: 'full'}
];
