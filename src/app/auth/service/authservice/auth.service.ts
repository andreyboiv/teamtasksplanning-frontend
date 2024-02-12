import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environments";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<User | null>(null);
  isLoggeIn = false;

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

  public resendActivateEmail(email: string | undefined): Observable<string> {
    return this.httpClient.post<string>(this.backendAuthURI + '/resend-activate-email', email, HTTPOptions);
  }
}

var HTTPOptions = {
  headers: new HttpHeaders({
    'Accept':'text/plain;charset=UTF-8'
  }),
  'responseType': 'text' as 'json'
}
