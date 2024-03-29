import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationService} from '../Notifications/notification.service';
import {UserInfo} from '../../Models/User/userinfo';
import {environment} from '../../../environments/environment';

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
    return this.http.get<UserInfo>(environment.serverConfig.host + '/user/1/info', httpOptions);
  }

  testGetUserByIdFail(): Observable<UserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    return this.http.get<UserInfo>(environment.serverConfig.host + '/user/236/info', httpOptions);
  }

}
