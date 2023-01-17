import { TestBed } from '@angular/core/testing';

import { MenudetailsService } from './menudetails.service';

describe('MenudetailsService', () => {
  let service: MenudetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenudetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
