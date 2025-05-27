import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEsquemaPagoPage } from './registro-esquema-pago.page';

describe('RegistroEsquemaPagoPage', () => {
  let component: RegistroEsquemaPagoPage;
  let fixture: ComponentFixture<RegistroEsquemaPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEsquemaPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
