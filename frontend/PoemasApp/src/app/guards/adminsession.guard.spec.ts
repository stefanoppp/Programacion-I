import { TestBed } from '@angular/core/testing';

import { AdminsessionGuard } from './adminsession.guard';

describe('AdminsessionGuard', () => {
  let guard: AdminsessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminsessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
