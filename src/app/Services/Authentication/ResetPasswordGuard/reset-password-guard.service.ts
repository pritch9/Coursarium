import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuardService {

  constructor(private router: Router,
              private http: HttpClient) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let error = false;
    let user_id = route.params.user_id,
      hash = route.params.hash;
    const status = await this.checkAuthorizedHash(user_id, hash).catch((err) => {
      console.log('Error: ' + err.error);
      error = true;
    });
    if (!error) {
      if (status.verify) {
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/welcome']).catch(err => console.log(err));
    return false;
  }


  checkAuthorizedHash(user_id, hash) {
    const url = environment.serverConfig.host + 'auth/verifyResetPassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id,
      hash
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions).toPromise();
  }

  resetPassword(user_id, hash, password) {
    const url = environment.serverConfig.host + 'auth/resetPassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id,
      hash,
      password
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions).toPromise();
  }
}
