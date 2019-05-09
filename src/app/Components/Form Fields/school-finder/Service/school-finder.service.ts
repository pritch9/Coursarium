import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SchoolFinderInfo } from '../../../Views/splash/Service/splash.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolFinderService {

  infoSubject: Subject<SchoolFinderInfo> = new Subject<SchoolFinderInfo>();
  expandSubject: Subject<boolean> = new Subject<boolean>();
  usingSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setSchoolInfo(info: SchoolFinderInfo) {
    this.infoSubject.next(info);
  }

  setUsing(bool: boolean): void {
    this.usingSubject.next(bool);
  }

  setExpanded(bool: boolean): void {
    this.expandSubject.next(bool);
  }

  getSchoolInfo(): Subject<SchoolFinderInfo> {
    return this.infoSubject;
  }

  getExpanded(): Subject<boolean> {
    return this.expandSubject;
  }

  getUsing(): Subject<boolean> {
    return this.usingSubject;
  }


}
