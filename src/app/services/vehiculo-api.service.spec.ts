import { TestBed } from '@angular/core/testing';

import { VehiculoAPIService } from './vehiculo-api.service';

describe('VehiculoAPIService', () => {
  let service: VehiculoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
