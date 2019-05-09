import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {LogOutService} from '../../Services/Authentication/LogOut/log-out.service';
import {CurrentUserService} from '../../Services/Users/CurrentUser/current-user.service';
import {UserInfo} from '../../Models/User/userinfo';
import {Router} from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: UserInfo;
  isProfessor = false;

  constructor(private logout: LogOutService,
              private currentUserService: CurrentUserService,
              private router: Router) { }

  ngOnInit() {
    console.log('[NavBar] getting current user');
    this.currentUserService.getCurrentUser().then(user => {
      console.log('User object got get');
      if (!user) {
        console.log('[NavBar] User not found');
        if (this.user) {
          delete this.user;
        }
        return;
      }
      this.user = user;
    }).catch(err => console.log(err));
  }


  logOut() {
    this.logout.logout();
    delete this.user;
  }

  showMenu(menu) {
    $(menu).toggleClass('show');
  }

  hideMenu(menu) {
    $(menu).removeClass('show');
  }

  showDD($event: any) {
    const parent = $($event.target).closest('.drop');
    $(parent).find('.menu').addClass('show');
  }

  hideDD() {
    $('.menu').removeClass('show');
  }
  navigate(str) {
    this.router.navigate([str]).catch(err => console.log(err));
  }

}
