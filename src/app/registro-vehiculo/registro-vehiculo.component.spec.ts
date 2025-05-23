import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroVehiculoComponent } from './registro-vehiculo.component';

describe('RegistroVehiculoComponent', () => {
  let component: RegistroVehiculoComponent;
  let fixture: ComponentFixture<RegistroVehiculoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroVehiculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
