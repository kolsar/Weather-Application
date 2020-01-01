import { TestBed } from '@angular/core/testing';

import { DayModalService } from './day-modal.service';

describe('DayServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayModalService = TestBed.get(DayModalService);
    expect(service).toBeTruthy();
  });
});
