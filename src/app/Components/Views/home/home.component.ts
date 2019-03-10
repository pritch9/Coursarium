import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';
import {AuthenticationService} from '../../../Services/Authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) { }


  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
