import {Injectable} from '@angular/core';
import {CourseInfo, Term} from '../../Models/Course/CourseInfo';
import {UserInfo} from '../../Models/User/userinfo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseInfoByID(course_id): Promise<CourseInfo> {
    const url = environment.serverConfig.host + 'course/' + course_id + '/info';
    return this.http.get<CourseInfo>(url).toPromise();
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
    const url = environment.serverConfig.host + 'getCourseInfoByUserId';
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
}
