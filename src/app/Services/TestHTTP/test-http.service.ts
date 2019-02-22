import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationService} from '../Notifications/notification.service';
import { UserInfo } from '../../Models/User/userinfo';

@Injectable({
  providedIn: 'root'
})
export class TestHTTPService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }


  /***
   * Testing http connection to Server.  This will return an observable:
   *
   * {
   *     message: 'Success'
   * }
   */
  testGetUserByIdSuccess(): Observable<UserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    return this.http.get<UserInfo>('https://localhost:8443/user/1/info', httpOptions);
  }

  testGetUserByIdFail(): Observable<UserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    return this.http.get<UserInfo>('http://localhost:8000/user/236/info', httpOptions);
  }

}
