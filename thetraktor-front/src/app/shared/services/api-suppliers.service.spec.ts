import { TestBed } from '@angular/core/testing';

import { ApiSuppliersService } from './api-suppliers.service';

describe('ApiSuppliersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSuppliersService = TestBed.get(ApiSuppliersService);
    expect(service).toBeTruthy();
  });
});
