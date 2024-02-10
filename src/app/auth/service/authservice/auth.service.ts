import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendAuthURI = environment.backendURL + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  public login(body: User): Observable<string> {
    return this.httpClient.post<string>(this.backendAuthURI + '/login', body, HTTPOptions);
  }

  public register(body: User): Observable<string> {
    return this.httpClient.put<string>(this.backendAuthURI + '/register', body, HTTPOptions);
  }

  public activateAccount(uuid: string | undefined): Observable<string> {
    return this.httpClient.post<string>(this.backendAuthURI + '/activate-account', uuid, HTTPOptions);
  }

  public sendEmailResetPassword(email: string | undefined): Observable<string> {
    return this.httpClient.post<string>(this.backendAuthURI + '/send-reset-password-email', email, HTTPOptions);
  }

  public updatePassword(request: string | undefined, token: string | undefined): Observable<string> {
    const tokenParam = new HttpParams().set('token', token!);
    return this.httpClient.post<string>(this.backendAuthURI + '/update-password', request,
      {
        params: tokenParam, headers: new HttpHeaders({
          'Accept': 'text/plain;charset=UTF-8'
        }), 'responseType': 'text' as 'json'
      });
  }
}

var HTTPOptions = {
  headers: new HttpHeaders({
    'Accept':'text/plain;charset=UTF-8'
  }),
  'responseType': 'text' as 'json'
}

export class User {
  id: number | undefined;
  login: string | undefined;
  password: string | undefined;
  email: string | undefined;
  powers: Array<Role> | undefined; // USER, ADMIN
}

export class Role {
  name: string | undefined;
}
