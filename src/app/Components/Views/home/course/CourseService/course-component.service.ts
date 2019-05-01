import { Injectable } from '@angular/core';
import {CourseInfo} from '../../../../../Models/Course/CourseInfo';
import {CourseService} from '../../../../../Services/Courses/course.service';
import { of } from 'rxjs';
import {CurrentUserService} from '../../../../../Services/Users/CurrentUser/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseComponentService {

  static course: CourseInfo;

  constructor(private courseService: CourseService,
              private currentUserService: CurrentUserService) { }

  getCourseByID(course_id) {
    return new Promise<CourseInfo>((resolve, reject) => {
      this.currentUserService.getCurrentUser().then(user => {
        this.courseService.getCourseInfoByID(course_id, user.id).then(result => {
          CourseComponentService.course = result;
          resolve(result);
          console.log('[Course] Course Info: ' + JSON.stringify(result));
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    });
  }

  getCourse() {
    return of(CourseComponentService.course).toPromise();
  }

}
