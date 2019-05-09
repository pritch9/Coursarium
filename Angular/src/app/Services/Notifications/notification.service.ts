import {Injectable} from '@angular/core';
import {Notification} from '../../Models/Notification/Notification';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  n: Notification = {
    id: 1,
    date: new Date(),
    title: 'This is an example',
    body: 'Body',
    link: '12345mo'
  };

  getNotifications(): Observable<Notification[]> {
    return of([this.n]);
  }

  constructor() { }
}
