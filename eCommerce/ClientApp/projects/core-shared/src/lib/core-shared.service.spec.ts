import { TestBed } from '@angular/core/testing';

import { CoreSharedService } from './core-shared.service';

describe('CoreSharedService', () => {
  let service: CoreSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
