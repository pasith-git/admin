import { TestBed } from '@angular/core/testing';

import { ResolverGuardGuard } from './resolver-guard.guard';

describe('ResolverGuardGuard', () => {
  let guard: ResolverGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResolverGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
