import { TestBed } from '@angular/core/testing';

import { ViajeDataService } from './viaje-data.service';

describe('ViajeDataService', () => {
  let service: ViajeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViajeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
