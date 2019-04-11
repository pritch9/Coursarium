import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../Authentication/authentication.service';
import {LogOutService} from '../LogOut/log-out.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private logout: LogOutService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let error = false;
    const status = await this.authService.isAuthentic().catch((err) => {
      console.log('Error: ' + err.error);
      error = true;
    });
    if (!error) {
      if (status.pass) {
        return true;
      }
    }
    console.log('redirecting');
    this.logout.clearData();
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/welcome']).catch(err => console.log(err));
    return false;
  }
}
