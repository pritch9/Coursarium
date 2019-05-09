import { TestBed } from '@angular/core/testing';

import { TestHTTPService } from './test-http.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TestHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TestHTTPService = TestBed.get(TestHTTPService);
    expect(service).toBeTruthy();
  });
});
