import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GananciasVehiculoPage } from './ganancias-vehiculo.page';

describe('GananciasVehiculoPage', () => {
  let component: GananciasVehiculoPage;
  let fixture: ComponentFixture<GananciasVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GananciasVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
