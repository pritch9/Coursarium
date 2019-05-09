import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {AnnouncementService} from '../../../../Services/Announcements/announcement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: UserInfo;
  announcements = [];

  constructor(private announcementService: AnnouncementService,
              private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.currentUserService.getCurrentUser().then(user => {
      if (!user) {
        return;
      }
      this.user = user;

      this.loadUserData();
    });
  }

  loadUserData() {
    this.announcementService.getAnnouncementsById(this.user.id).subscribe(result => {
      for (const r of result) {
        r.date = new Date(r.date);
        console.log(JSON.stringify(r));
      }
      this.announcements = result;
    });
  }

  expandModule($event) {
    $($event.target).parent().parent().parent().toggleClass('expand');
  }

  toggleHidden($event) {
    let parent;
    const showing = (parent = $($event.target).parent().parent()).hasClass('show-hidden');
    if ($(parent).find('.mod-body .container > div').length !== 0) {
      $(parent).removeClass('empty');
    }
    $(parent).toggleClass('show-hidden');
    $($event.target).text((showing) ? 'View Hidden' : 'Hide Hidden');
  }

  hide($event) {
    const parent = $($event.target).parent();
    const module = $(parent).parent().parent().parent();
    const hiding = $(parent).hasClass('hide');
    if (hiding) {
      // show
      $(parent).removeClass('hide');
    } else {
      // hide
      $(parent).addClass('hide');
    }
    $($event.target).text((hiding) ? 'hide' : 'unhide');
    const num = $(module).find('.mod-body .container > div:not(".hide")').length;
    if (num === 0) {
      $(module).addClass('empty');
    } else {
      $(module).removeClass('empty');
    }
  }

  // TODO: Fix the announcement title to flex
  isEmpty(str: string): boolean {
    if (str === undefined) {
      return true;
    }
    if (str === null) {
      return true;
    }
    return str.trim() === '';
  }
}


