import { TestBed } from '@angular/core/testing';

import { AireService } from './aire-service';

describe('AireService', () => {
  let service: AireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
