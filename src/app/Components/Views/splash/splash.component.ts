import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserInfo} from '../../../Models/User/userinfo';
import {CurrentUserService} from '../../../Services/Users/CurrentUser/current-user.service';
import {LogOutService} from '../../../Services/Authentication/LogOut/log-out.service';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  school: number;

  user: UserInfo;

  constructor(private currentUser: CurrentUserService,
              private logout: LogOutService) { }

  ngOnInit() {
    console.log('[Splash] getting current user');
    this.currentUser.getCurrentUser().then(user => {
      if (user.id === -1) {
        console.log('[Splash] User not found');
        return;
      }
      this.user = user;
    });
  }

  updateSchool($event) {
    this.school = $event;
  }

  showDD($event: any) {
    const parent = $($event.target).closest('.drop');
    $(parent).find('.menu').addClass('show');
  }

  hideDD() {
    $('.menu').removeClass('show');
  }

  logOut() {
    this.logout.logout();
    delete this.user;
  }

}
