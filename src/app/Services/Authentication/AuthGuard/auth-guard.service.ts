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
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']).catch(err => console.log(err));
    return false;
  }
}
