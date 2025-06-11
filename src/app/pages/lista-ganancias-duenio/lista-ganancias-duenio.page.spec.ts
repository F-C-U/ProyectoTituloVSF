import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaGananciasDuenioPage } from './lista-ganancias-duenio.page';

describe('ListaGananciasDuenioPage', () => {
  let component: ListaGananciasDuenioPage;
  let fixture: ComponentFixture<ListaGananciasDuenioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGananciasDuenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
