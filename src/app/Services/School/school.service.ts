import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {School} from '../../Models/School/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  allSchools: School[] = [{
    id: 0,
    name: 'University at Buffalo (SUNY)',
    address: 'University at Buffalo',
    city: 'Buffalo, NY',
    zip: '14261',
    avi: '',
    banner: ''
  }];

  constructor() { }

  getAllSchools(): Observable<School[]> {
    return of(this.allSchools);
  }
}
