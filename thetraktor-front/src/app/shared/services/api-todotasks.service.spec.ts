import { TestBed } from '@angular/core/testing';

import { ApiTodotasksService } from './api-todotasks.service';

describe('ApiTodotasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTodotasksService = TestBed.get(ApiTodotasksService);
    expect(service).toBeTruthy();
  });
});
