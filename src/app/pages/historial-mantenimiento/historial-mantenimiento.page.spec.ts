import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialMantenimientoPage } from './historial-mantenimiento.page';

describe('HistorialMantenimientoPage', () => {
  let component: HistorialMantenimientoPage;
  let fixture: ComponentFixture<HistorialMantenimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialMantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
