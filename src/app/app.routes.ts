import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo: '', pathMatch: 'full'},
  {path: 'index', redirectTo: '', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'}
];
