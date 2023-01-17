import { TestBed } from '@angular/core/testing';

import { FirstpermissionGuard } from './firstpermission.guard';

describe('FirstpermissionGuard', () => {
  let guard: FirstpermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstpermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
