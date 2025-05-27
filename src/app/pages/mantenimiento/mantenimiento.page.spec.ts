import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoPage } from './mantenimiento.page';

describe('MantenimientoPage', () => {
  let component: MantenimientoPage;
  let fixture: ComponentFixture<MantenimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
