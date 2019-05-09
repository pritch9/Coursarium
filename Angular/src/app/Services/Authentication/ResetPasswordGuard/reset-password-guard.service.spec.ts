import {TestBed} from '@angular/core/testing';

import {ResetPasswordGuardService} from './reset-password-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ResetPasswordGuardService = TestBed.get(ResetPasswordGuardService);
    expect(service).toBeTruthy();
  });
});
