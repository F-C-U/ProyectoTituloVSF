import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroVehiculoPage } from './registro-vehiculo.page';

describe('RegistroVehiculoPage', () => {
  let component: RegistroVehiculoPage;
  let fixture: ComponentFixture<RegistroVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
