import {TestBed} from '@angular/core/testing';

import {CurrentUserService} from './current-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CurrentUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CurrentUserService = TestBed.get(CurrentUserService);
    expect(service).toBeTruthy();
  });
});
