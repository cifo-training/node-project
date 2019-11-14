import { TestBed } from '@angular/core/testing';

import { ApiTodoService } from './api-todo.service';

describe('ApiTodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTodoService = TestBed.get(ApiTodoService);
    expect(service).toBeTruthy();
  });
});
