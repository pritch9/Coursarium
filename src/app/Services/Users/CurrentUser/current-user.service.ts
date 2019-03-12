import { Injectable } from '@angular/core';
import {EMPTY, UserInfo} from '../../../Models/User/userinfo';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from '../../Authentication/Authentication/authentication.service';
import {UserService} from '../UserService/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  currentUser: UserInfo;
  currentUserPromise: Promise<UserInfo>;
  constructor(private http: HttpClient,
              private auth: AuthenticationService,
              private users: UserService) { }


  async getCurrentUser() {
    if (this.currentUser === undefined) {
      if (this.currentUserPromise === undefined) {
        this.currentUserPromise = this.findCurrentUser();
      }
      return await this.currentUserPromise;
    }
    return this.currentUser;
  }

  async findCurrentUser() {
    console.log('Finding current user!');
    const user_id = localStorage.getItem('user_id');
    const stored = localStorage.getItem('user_info');
    if (this.currentUser === undefined) {
      if (stored !== null || user_id !== null) {
        // Authenticate
        const authentic = await this.auth.authenticate();
        if (authentic === undefined) {
          localStorage.removeItem('user_info');
          localStorage.removeItem('user_id');
          localStorage.removeItem('sid');
          console.log('Removing data...');
          console.log('Done');
          return EMPTY;
        } else {
          let user_info = (stored === null) ? null : JSON.parse(stored);
          if (stored === null) {
            user_info = await this.users.getUserInfo(user_id);
            localStorage.setItem('user_info', JSON.stringify(user_info));
          }
          this.currentUser = user_info;
        }
      } else {
        console.log('done');
        return EMPTY;
      }
    }
    console.log('done');
    return this.currentUser;
  }

  logout() {
    delete this.currentUser;
  }

}
