import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  expand = false;
  loading = true;
  avi = false;
  user: UserInfo = null;

  constructor(private currentUser: CurrentUserService) { }

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
    this.currentUser.getCurrentUser().then(user => {
      if (user.id === -1) {
        console.log('Someone is messing with things they shouldn\'t!');
        return;
      }
      this.user = user;
      this.loading = false;
      this.avi = !this.isEmpty(this.user.avi);
      console.log('Current user: ' + this.user.first_name + ' ' + this.user.last_name);
    });
  }


}
