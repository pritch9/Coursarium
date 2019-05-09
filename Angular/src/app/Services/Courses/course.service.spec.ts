import {TestBed} from '@angular/core/testing';

import {CourseService} from './course.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service).toBeTruthy();
  });
});
