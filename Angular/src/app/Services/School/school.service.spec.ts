import {TestBed} from '@angular/core/testing';

import {SchoolService} from './school.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SchoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SchoolService = TestBed.get(SchoolService);
    expect(service).toBeTruthy();
  });
});
