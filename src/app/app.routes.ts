import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ErrorComponent} from "./auth/error/error.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo: '', pathMatch: 'full'},
  {path: 'index', redirectTo: '', pathMatch: 'full'},
  {path: 'error', component: ErrorComponent}
];
