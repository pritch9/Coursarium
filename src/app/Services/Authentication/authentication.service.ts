import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(school, email, password, first_name, last_name): Observable<any> {
    const url = 'http://localhost:8000/auth/register';
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
    const url = 'http://localhost:8000/auth/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      email,
      password
    };
    return this.http.post<any>(url, body, httpOptions);
  }

  async isAuthentic() {
    const session_id = localStorage.getItem('sid');
    const user_id = localStorage.getItem('user_id');

    console.log('session id: ' + session_id);

    if (session_id === null || user_id === null) {
      return of(false);
    }

    const url = 'http://localhost:8000/auth/authenticate';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'text'
      })
    };
    const body = JSON.parse(JSON.stringify({
      session_id,
      user_id
    }));

    return await this.http.post<any>(url, body, httpOptions).toPromise();
  }

}
