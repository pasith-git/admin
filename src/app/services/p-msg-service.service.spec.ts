import { TestBed } from '@angular/core/testing';

import { PMsgServiceService } from './p-msg-service.service';

describe('PMsgServiceService', () => {
  let service: PMsgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PMsgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
