import { TestBed, inject } from '@angular/core/testing';

import { ManageIngredientsService } from './manage-ingredients.service';

describe('ManageIngredientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageIngredientsService]
    });
  });

  it('should be created', inject([ManageIngredientsService], (service: ManageIngredientsService) => {
    expect(service).toBeTruthy();
  }));
});
