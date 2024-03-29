import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CourseService} from '../../Courses/course.service';

@Injectable({
  providedIn: 'root',

})
export class CourseGuardService {

  constructor(private router: Router,
              private courseService: CourseService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let error = false;
    let user_id = localStorage.getItem('user_id');
    const course_list = await this.courseService.getCoursesOfProfessor(user_id).toPromise();
    if (!error) {
      if (course_list.length) {
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/dashboard']).catch(err => console.log(err));
    return false;
  }
}
