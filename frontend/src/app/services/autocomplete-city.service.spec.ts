import { TestBed } from '@angular/core/testing';

import { AutocompleteCityService } from './autocomplete-city.service';

describe('AutocompleteCityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocompleteCityService = TestBed.get(AutocompleteCityService);
    expect(service).toBeTruthy();
  });
});
