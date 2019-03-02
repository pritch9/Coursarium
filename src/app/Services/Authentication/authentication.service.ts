import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(json: JSON): Observable<string> {
    const url = 'https://localhost:8443/register';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'text'
      })
    };
    return this.http.post<string>(url, json, httpOptions);
  }
}
