import {TestBed} from '@angular/core/testing';

import {AnnouncementService} from './announcement.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AnnouncementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AnnouncementService = TestBed.get(AnnouncementService);
    expect(service).toBeTruthy();
  });
});
