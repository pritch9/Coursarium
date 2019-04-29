import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserInfo} from '../../../Models/User/userinfo';
import {CurrentUserService} from '../../../Services/Users/CurrentUser/current-user.service';
import {LogOutService} from '../../../Services/Authentication/LogOut/log-out.service';
import {Router} from '@angular/router';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  school: number;

  constructor() { }

  ngOnInit() {

  }

  updateSchool($event) {
    this.school = $event;
  }


}
