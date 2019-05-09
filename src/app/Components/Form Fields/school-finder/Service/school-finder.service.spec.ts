import {TestBed} from '@angular/core/testing';

import {SchoolFinderService} from './school-finder.service';

describe('SchoolFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolFinderService = TestBed.get(SchoolFinderService);
    expect(service).toBeTruthy();
  });
});
