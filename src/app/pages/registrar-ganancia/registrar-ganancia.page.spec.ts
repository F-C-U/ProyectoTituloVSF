import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarGananciaPage } from './registrar-ganancia.page';

describe('RegistrarGananciaPage', () => {
  let component: RegistrarGananciaPage;
  let fixture: ComponentFixture<RegistrarGananciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarGananciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
