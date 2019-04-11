import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CurrentUserService} from '../../Users/CurrentUser/current-user.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private http: HttpClient,
              private router: Router) {
  }



  logout() {
    const user_id = localStorage.getItem('user_id');
    const session_id = localStorage.getItem('sid');
    this.clearData();
    const url = environment.serverConfig.host + 'auth/logout';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'text'
      })
    };
    const body = JSON.parse(JSON.stringify({
      session_id,
      user_id
    }));
    console.log('logging out');
    this.http.post<any>(url, body, httpOptions).subscribe(() => {
      console.log('Clearing local storage');
      localStorage.clear();
      CurrentUserService.logout();
      setTimeout(() =>
        this.router.navigate(['/welcome']).finally(() => {
          console.log('Logged out');
        })
      );
    });
  }

  clearData() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('sid');
  }

}
