import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let error = 0;
    const status = await this.authService.isAuthentic().catch(() => {
      console.log('Rejected');
      error = 1;
    });
    console.log('Checking other errors');
    if (status !== undefined && status !== null) {
      console.log('checking status');
      if (!status.value) {
        console.log('no status value');
        error = 1;
      }
    }

    console.log('checking errors again');
    if (!error) {
      console.log('returning true');
      return true;
    }

    console.log('redirecting');
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }
}
