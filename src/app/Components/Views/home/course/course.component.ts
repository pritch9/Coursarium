import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {UserInfo} from '../../../../Models/User/userinfo';
import {CourseInfo} from '../../../../Models/Course/CourseInfo';
import {CourseService} from '../../../../Services/Courses/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course_id: number;
  user: UserInfo;
  school: any;

  courseInfo: CourseInfo;

  constructor(private route: ActivatedRoute,
              private currentUserService: CurrentUserService,
              private courseService: CourseService) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.params.id;
    this.courseService.getCourseInfoByID(this.course_id).then(result => {
      this.courseInfo = result;
      console.log('[Course] Course Info: ' + JSON.stringify(result));
    }).catch(err => {
      console.log(err);
    });
    this.currentUserService.getCurrentUser().then(user => {
      if (!user) {
        console.log('[Course] Error! User not defined!');
      }
      this.user = user;
      this.school = user.school;
    });
  }

}
