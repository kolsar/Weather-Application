import { TestBed } from '@angular/core/testing';

import { StateSealService } from './state-seal.service';

describe('StateSealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateSealService = TestBed.get(StateSealService);
    expect(service).toBeTruthy();
  });
});
