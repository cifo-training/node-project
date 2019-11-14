import { TestBed } from '@angular/core/testing';

import { ApiPlansService } from './api-plans.service';

describe('ApiPlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPlansService = TestBed.get(ApiPlansService);
    expect(service).toBeTruthy();
  });
});
