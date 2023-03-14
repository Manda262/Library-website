import { TestBed } from '@angular/core/testing';

import { RaspolozivostService } from './raspolozivost.service';

describe('RaspolozivostService', () => {
  let service: RaspolozivostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaspolozivostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
