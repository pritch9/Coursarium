import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export class SchoolFinderInfo {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  school = new Subject<SchoolFinderInfo>();

  constructor() { }

  setSchool(info: SchoolFinderInfo) {
    this.school.next(info);
  }

  getSchool(): Subject<SchoolFinderInfo> {
    return this.school;
  }
}
