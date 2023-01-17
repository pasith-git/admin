import { TestBed } from '@angular/core/testing';

import { RoleInterceptorInterceptor } from './role-interceptor.interceptor';

describe('RoleInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoleInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RoleInterceptorInterceptor = TestBed.inject(RoleInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
