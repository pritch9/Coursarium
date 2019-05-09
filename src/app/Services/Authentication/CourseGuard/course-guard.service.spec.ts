import {TestBed} from '@angular/core/testing';

import {CourseGuardService} from './course-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
  }));

  it('should be created', () => {
    const service: CourseGuardService = TestBed.get(CourseGuardService);
    expect(service).toBeTruthy();
  });
});
