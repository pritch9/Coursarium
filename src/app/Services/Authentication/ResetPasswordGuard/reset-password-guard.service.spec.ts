import { TestBed } from '@angular/core/testing';

import { ResetPasswordGuardService } from './reset-password-guard.service';

describe('ResetPasswordGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPasswordGuardService = TestBed.get(ResetPasswordGuardService);
    expect(service).toBeTruthy();
  });
});
