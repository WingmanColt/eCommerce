import { TestBed } from '@angular/core/testing';

import { UISharedService } from './ui-shared.service';

describe('UISharedService', () => {
  let service: UISharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UISharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
