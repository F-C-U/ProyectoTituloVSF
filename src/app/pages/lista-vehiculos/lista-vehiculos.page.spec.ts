import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaVehiculosPage } from './lista-vehiculos.page';

describe('ListaVehiculosPage', () => {
  let component: ListaVehiculosPage;
  let fixture: ComponentFixture<ListaVehiculosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
