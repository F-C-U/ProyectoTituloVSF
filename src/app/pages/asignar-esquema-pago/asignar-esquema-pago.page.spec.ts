import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarEsquemaPagoPage } from './asignar-esquema-pago.page';

describe('AsignarEsquemaPagoPage', () => {
  let component: AsignarEsquemaPagoPage;
  let fixture: ComponentFixture<AsignarEsquemaPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEsquemaPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
