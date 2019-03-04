import { Injectable } from '@angular/core';
import {UserInfo} from '../../Models/User/userinfo';
import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  user: UserInfo = {
    id: 1,
    school: 1,
    email: 'example@example.com',
    first_name: 'William',
    last_name: 'Pritchard',
    full_name: 'Pritchard, William',
    nick_name: 'Pritch',
    avi: ''
  };

  getCurrentUser(): Observable<UserInfo> {
    return of(this.user).pipe(delay(4000));
  }

  constructor() { }
}
