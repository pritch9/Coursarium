import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let error = 0;
    const status = await this.authService.isAuthentic().catch(() => {
      error = 1;
    });
    if (status !== undefined && status !== null) {
      if (!status.value) {
        error = 1;
      }
    }

    if (!error) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
  }
}
