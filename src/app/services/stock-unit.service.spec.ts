import { TestBed } from '@angular/core/testing';

import { StockUnitService } from './stock-unit.service';

describe('StockUnitService', () => {
  let service: StockUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
