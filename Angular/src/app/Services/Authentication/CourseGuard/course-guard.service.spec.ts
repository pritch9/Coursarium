import {TestBed} from '@angular/core/testing';

import {CourseGuardService} from './course-guard.service';

describe('CourseGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseGuardService = TestBed.get(CourseGuardService);
    expect(service).toBeTruthy();
  });
});
