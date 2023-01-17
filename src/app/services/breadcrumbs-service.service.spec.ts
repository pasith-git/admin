import { TestBed } from '@angular/core/testing';

import { BreadcrumbsServiceService } from './breadcrumbs-service.service';

describe('BreadcrumbsServiceService', () => {
  let service: BreadcrumbsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
