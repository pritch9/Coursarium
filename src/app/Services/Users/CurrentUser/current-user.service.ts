import { Injectable } from '@angular/core';
import { UserInfo } from '../../../Models/User/userinfo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Authentication/Authentication/authentication.service';
import { UserService } from '../UserService/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  static currentUserPromise: Promise<UserInfo>;
  static currentUser: UserInfo;
  constructor(private http: HttpClient,
              private auth: AuthenticationService,
              private users: UserService) {}

  static logout() {
    delete CurrentUserService.currentUser;
  }

  static async getCurrentUser() {
    if (!CurrentUserService.currentUser) {
      console.log('[CurrentUser] Still waiting for current user data to load');
      return CurrentUserService.currentUserPromise;
    }
    console.log('[CurrentUser] User data already loaded.  Returning it.');
    return Promise.resolve(CurrentUserService.currentUser);
  }

  findCurrentUser() {
    CurrentUserService.currentUserPromise = this.loadCurrentUser();
  }

  private async loadCurrentUser(): Promise<UserInfo> {
    console.log('[CurrentUser] Finding current user...');
    const user_id = localStorage.getItem('user_id');
    const stored = localStorage.getItem('user_info');
    if (stored) {
      console.log('[CurrentUser] Found user data in storage');
      const user_info = JSON.parse(stored);
      if (user_info.id !== user_id) {
        console.log('[CurrentUser] Data is NOT current user');
        localStorage.removeItem('user_info');
      } else {
        console.log('[CurrentUser] Data is current user');
        CurrentUserService.currentUser = user_info;
      }
    }
    if (!CurrentUserService.currentUser) {
      console.log('[CurrentUser] Querying user data');
      CurrentUserService.currentUser = await this.users.getUserInfo(user_id);
      console.log('[CurrentUser] Current user data found: ' + (CurrentUserService.currentUser !== undefined
        && CurrentUserService.currentUser !== null));
      localStorage.setItem('user_info', JSON.stringify(CurrentUserService.currentUser));
    }
    if (CurrentUserService.currentUser) {
      console.log('[CurrentUser] Current user: ' + CurrentUserService.currentUser.full_name);
    }
    return CurrentUserService.currentUser;
  }

}
