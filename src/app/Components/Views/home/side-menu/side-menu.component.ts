import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  private static userStore: UserInfo;
  expand = false;
  loading = true;
  avi = false;
  user: UserInfo;
  routeActive: string;

  constructor(private currentUserService: CurrentUserService,
              private router: Router) { }

  isEmpty(str: string): boolean {
    if (str === undefined) {
      return true;
    }
    if (str === null) {
      return true;
    }
    return str.trim() === '';
  }

  ngOnInit() {
    console.log('[SideMenu] Initializing...');
    if (SideMenuComponent.userStore === undefined) {
      console.log('[SideMenu] User not found!  Finding now.');
      this.currentUserService.getCurrentUser().then(user => {
        console.log('[SideMenu] Asking for current user');
        if (!user) {
          console.log('[SideMenu] Someone is messing with things they shouldn\'t!');
          delete this.user;
          return;
        }
        console.log('[SideMenu] User found!');
        SideMenuComponent.userStore = user;
        this.user = user;
        this.loading = false;
        this.avi = !this.isEmpty(this.user.avi);
        console.log('[SideMenu] Current user: ' + this.user.first_name + ' ' + this.user.last_name);
      });
    } else {
      console.log('[SideMenu] User data found!');
    }
  }


}
