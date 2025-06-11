import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaGananciaPage } from './lista-ganancia.page';

describe('ListaGananciaPage', () => {
  let component: ListaGananciaPage;
  let fixture: ComponentFixture<ListaGananciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGananciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
