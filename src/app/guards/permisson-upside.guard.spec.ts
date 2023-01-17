import { TestBed } from '@angular/core/testing';

import { PermissonUpsideGuard } from './permisson-upside.guard';

describe('PermissonUpsideGuard', () => {
  let guard: PermissonUpsideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissonUpsideGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
