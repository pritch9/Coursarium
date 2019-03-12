import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CurrentUserService} from '../../Users/CurrentUser/current-user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private http: HttpClient,
              private currentUser: CurrentUserService,
              private router: Router) {
  }



  logout() {
    const user_id = localStorage.getItem('user_id');
    const session_id = localStorage.getItem('sid');
    localStorage.removeItem('user_id');
    localStorage.removeItem('sid');
    const url = 'http://localhost:8000/auth/logout';
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
      this.currentUser.logout();
      setTimeout(() =>
        this.router.navigate(['/']).finally(() => {
          console.log('Logged out');
        })
      );
    });
  }

}
