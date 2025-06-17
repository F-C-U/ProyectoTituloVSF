import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarVehiculoPage } from './seleccionar-vehiculo.page';

describe('SeleccionarVehiculoPage', () => {
  let component: SeleccionarVehiculoPage;
  let fixture: ComponentFixture<SeleccionarVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
