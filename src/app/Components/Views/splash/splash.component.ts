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
    this.currentUser.getCurrentUser().then(user => {
      if (user.id !== -1) {
        this.user = user;
      }
    });
  }

  updateSchool($event) {
    this.school = $event;
  }

  showDD(event: any) {
    console.log('show');
    $(event.target).find('.menu').addClass('show');
  }

  hideDD(event: any) {
    $('.menu.show').removeClass('show');
  }

  logOut() {
    this.logout.logout();
    delete this.user;
  }

}
