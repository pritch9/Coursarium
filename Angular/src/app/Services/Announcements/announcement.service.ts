import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncementsById(user_id): Observable<any[]> {
    const url = environment.serverConfig.host + 'announcements/user';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      user_id
    }));
    return this.http.post<any[]>(url, body, headers);
  }

  makeAnnouncement(user_id, course_id, title, abody, term) {
    const url = environment.serverConfig.host + 'announcements/create';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      user_id,
      course_id,
      title,
      body: abody,
      term
    }));
    return this.http.post<any>(url, body, headers);
  }
}
