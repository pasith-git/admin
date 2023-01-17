import { TestBed } from '@angular/core/testing';

import { StockInOutService } from './stock-in-out.service';

describe('StockInOutService', () => {
  let service: StockInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
