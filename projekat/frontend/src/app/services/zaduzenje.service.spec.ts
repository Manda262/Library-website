import { TestBed } from '@angular/core/testing';

import { ZaduzenjeService } from './zaduzenje.service';

describe('ZaduzenjaService', () => {
  let service: ZaduzenjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaduzenjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
