import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CurrentUserService} from '../../../../Services/CurrentUser/current-user.service';
import {isEmpty} from 'rxjs/operators';

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

  ngOnInit() {
    this.currentUser.getCurrentUser().subscribe(user => {
      this.user = user;
      this.loading = false;
      setTimeout(() => this.avi = !this.isEmpty(this.user.avi), 500);
    });
  }

  isEmpty(str: string): boolean {
    return str.trim() === '';
  }


}
