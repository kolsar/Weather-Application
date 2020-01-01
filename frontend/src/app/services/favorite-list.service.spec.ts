import { TestBed } from '@angular/core/testing';

import { FavoriteListService } from './favorite-list.service';

describe('FavoriteListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteListService = TestBed.get(FavoriteListService);
    expect(service).toBeTruthy();
  });
});
