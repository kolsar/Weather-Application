import { TestBed } from '@angular/core/testing';

import { GetLocationService } from './location.service';

describe('GetLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLocationService = TestBed.get(GetLocationService);
    expect(service).toBeTruthy();
  });
});
