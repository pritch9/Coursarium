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

  constructor(private logout: LogOutService,
              private currentUserService: CurrentUserService) { }

  ngOnInit() {
    console.log('[Splash] getting current user');
    this.currentUserService.getCurrentUser().then(user => {
      console.log('User object got get');
      if (!user) {
        console.log('[Splash] User not found');
        if (this.user) {
          delete this.user;
        }
        return;
      }
      this.user = user;
    }).catch(err => console.log(err));
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
