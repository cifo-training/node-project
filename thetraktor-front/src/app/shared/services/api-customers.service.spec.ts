import { TestBed } from '@angular/core/testing';

import { ApiCustomersService } from './api-customers.service';

describe('ApiCustomersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCustomersService = TestBed.get(ApiCustomersService);
    expect(service).toBeTruthy();
  });
});
