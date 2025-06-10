import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEsquemaPagoPage } from './editar-esquema-pago.page';

describe('EditarEsquemaPagoPage', () => {
  let component: EditarEsquemaPagoPage;
  let fixture: ComponentFixture<EditarEsquemaPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEsquemaPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
