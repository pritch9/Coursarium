import { TestBed } from '@angular/core/testing';

import { CourseComponentService } from './course-component.service';

describe('CourseComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseComponentService = TestBed.get(CourseComponentService);
    expect(service).toBeTruthy();
  });
});
