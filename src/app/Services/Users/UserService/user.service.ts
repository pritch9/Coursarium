import { Injectable } from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(user_id): Promise<UserInfo> {
    const url = 'http://localhost:8000/user/' + user_id + '/info';
    return this.http.get<UserInfo>(url).toPromise();
  }

}
