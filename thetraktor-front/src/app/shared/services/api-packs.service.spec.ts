import { TestBed } from '@angular/core/testing';

import { ApiPacksService } from './api-packs.service';

describe('ApiPacksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPacksService = TestBed.get(ApiPacksService);
    expect(service).toBeTruthy();
  });
});
