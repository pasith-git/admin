import { TestBed } from '@angular/core/testing';

import { SubRoutesService } from './sub-routes.service';

describe('SubRoutesService', () => {
  let service: SubRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
