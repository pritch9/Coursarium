import { TestBed } from '@angular/core/testing';

import { LogOutService } from './log-out.service';

describe('LogOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogOutService = TestBed.get(LogOutService);
    expect(service).toBeTruthy();
  });
});
