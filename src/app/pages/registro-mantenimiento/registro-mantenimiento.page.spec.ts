import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroMantenimientoPage } from './registro-mantenimiento.page';

describe('RegistroMantenimientoPage', () => {
  let component: RegistroMantenimientoPage;
  let fixture: ComponentFixture<RegistroMantenimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
