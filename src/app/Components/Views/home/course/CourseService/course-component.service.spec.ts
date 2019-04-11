import { TestBed } from '@angular/core/testing';

import { CourseComponentService } from './course-component.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CourseComponentService = TestBed.get(CourseComponentService);
    expect(service).toBeTruthy();
  });
});
