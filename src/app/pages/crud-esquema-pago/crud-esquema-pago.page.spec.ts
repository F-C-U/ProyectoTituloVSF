import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudEsquemaPagoPage } from './crud-esquema-pago.page';

describe('CrudEsquemaPagoPage', () => {
  let component: CrudEsquemaPagoPage;
  let fixture: ComponentFixture<CrudEsquemaPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEsquemaPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
