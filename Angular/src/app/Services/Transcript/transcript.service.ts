import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  constructor(private http: HttpClient) {

  }

  getTranscript(user_id) {
    const url = environment.serverConfig.host + 'user/transcript';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Response-Type': 'application/json'
      })
    };
    const body = JSON.parse(JSON.stringify({
      user_id
    }));
    return this.http.post<any>(url, body, httpOptions);
  }
}
