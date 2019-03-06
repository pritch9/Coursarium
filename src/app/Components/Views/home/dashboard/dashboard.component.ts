import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CurrentUserService} from '../../../../Services/CurrentUser/current-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: UserInfo;
  announcements = [
    {
      course: {
        id: 1,
        course_subject: 'CSE',
        course_number: 442,
      },
      user: {
        id: 1,
        first_name: 'William',
        last_name: 'Pritchard',
        avi: 'https://placehold.it/250x250'
      },
      user_role: 'Professor',
      date: new Date(),
      title: 'Announcement title',
      body: 'This is the announcement body'
    }
  ];

  constructor(private currentUser: CurrentUserService) { }

  ngOnInit() {
    this.currentUser.getCurrentUser().subscribe(user => this.user = user);
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

}
