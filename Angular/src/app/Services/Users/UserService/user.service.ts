import {Injectable} from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(user_id): Promise<UserInfo> {
    if (user_id === null) {
      return Promise.resolve(null);
    }
    const url = environment.serverConfig.host + 'user/info';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions).toPromise();
  }

}
