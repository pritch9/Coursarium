import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(school, email, password, first_name, last_name): Observable<any> {
    const url = environment.serverConfig.host + 'auth/register';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      school,
      email,
      password,
      first_name,
      last_name
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions);
  }

  login(email, password): Observable<any> {
    const url = environment.serverConfig.host + 'auth/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Response-Type': 'application/json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      email,
      password
    }));
    return this.http.post<any>(url, body, httpOptions);
  }

  authenticate() {
    console.log('Authenticating');
    const session_id = localStorage.getItem('sid');
    const user_id = localStorage.getItem('user_id');

    if (session_id === null || user_id === null) {
      return of(false);
    }
    console.log('user info found');

    const url = environment.serverConfig.host + 'auth/authenticate';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      session_id,
      user_id
    }));

    return this.http.post<any>(url, body, httpOptions);
  }

  async isAuthentic() {
    return await this.authenticate().toPromise();
  }

}
