import { Injectable } from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(user_id): Promise<UserInfo> {
    const url = environment.serverConfig.host + 'user/' + user_id + '/info';
    return this.http.get<UserInfo>(url).toPromise();
  }

}
