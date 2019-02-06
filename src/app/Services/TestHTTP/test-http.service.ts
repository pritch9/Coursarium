import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestHTTPService {

  constructor(private http: HttpClient) { }


  /***
   * Testing http connection to server.  This will return an observable:
   *
   * {
   *     message: 'Success'
   * }
   */
  testServer(): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
        'Response-Type': 'text'
      })
    };
    return this.http.post<any>('http://localhost:8000/test', { message: 'This is an example body' }, httpOptions);
  }

}
