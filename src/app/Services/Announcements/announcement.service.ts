import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncementsById(user_id): Observable<any[]> {
    const params = 'announcements/user';
    const url = environment.serverConfig.host + params;
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
}
