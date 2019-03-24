import {Injectable} from '@angular/core';
import {CourseInfo, Term} from '../../Models/Course/CourseInfo';
import {UserInfo} from '../../Models/User/userinfo';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseInfoByID(course_id): Promise<CourseInfo> {
    const url = 'http://localhost:8000/course/' + course_id + '/info';
    return this.http.get<CourseInfo>(url).toPromise();
  }

  getCourseInfoByUserID(user_id) {
    const url = 'http://localhost:8000/getCourseInfoByUserId';
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
