import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../Services/Courses/course.service';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {CourseInfo} from '../../../../Models/Course/CourseInfo';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss',
              '../dashboard/dashboard.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: CourseInfo[] = [];

  constructor(private courseService: CourseService,
              private currentUser: CurrentUserService) { }

  ngOnInit() {
    this.currentUser.getCurrentUser().then(user => {
      if(!user) {
        return;
      }
      console.log('[Courses] Getting courses for user');
      this.courseService.getCourseInfoByUserID(user.id).subscribe(result => {
        this.courses = result;
      });
    });
  }

  activate($event) {
    const target = $($event.target).closest('.course');
    $(target).addClass('active');
  }

  deactivate(item) {
    $(item).removeClass('active');
  }

}
