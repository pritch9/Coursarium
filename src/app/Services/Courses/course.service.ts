import {Injectable} from '@angular/core';
import {CourseInfo} from '../../Models/Course/CourseInfo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RosterStudent} from '../../Models/RosterStudent/RosterStudent';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseInfoByID(course_id, user_id): Promise<CourseInfo> {
    const url = environment.serverConfig.host + 'course/getInfo';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      course_id,
      user_id
    }));
    return this.http.post<CourseInfo>(url, body, headers).toPromise();
  }


  getFacultyByCourseID(course_id): Promise<any[]> {
    const url = environment.serverConfig.host + 'course/getFaculty';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      course_id
    }));
    return this.http.post<any[]>(url, body, headers).toPromise();
  }
  
  getCourseInfoByUserID(user_id) {
    const url = environment.serverConfig.host + 'course/getCourseInfoByUserId';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
       user_id
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions);
  }

  getCoursesOfProfessor(user_id) {
    const url = environment.serverConfig.host + 'course/getCoursesOfProfessor';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions);
  }

  verifyCourseProfessor(user_id, course_id) {
    const url = environment.serverConfig.host + 'course/verifyCourseProfessor';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id,
      course_id
    };
    return this.http.post<any>(url, JSON.parse(JSON.stringify(body)), httpOptions);
  }

  getCourseRoster(user_id, course_id) {
    const url = environment.serverConfig.host + 'course/getRoster';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = {
      user_id,
      course_id
    };
    return this.http.post<RosterStudent[]>(url, JSON.parse(JSON.stringify(body)), httpOptions);
  }
}
