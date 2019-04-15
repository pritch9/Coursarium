import { TestBed } from '@angular/core/testing';

import { LogOutService } from './log-out.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LogOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: LogOutService = TestBed.get(LogOutService);
    expect(service).toBeTruthy();
  });
});
