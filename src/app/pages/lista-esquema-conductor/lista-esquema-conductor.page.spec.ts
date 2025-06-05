import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEsquemaConductorPage } from './lista-esquema-conductor.page';

describe('ListaEsquemaConductorPage', () => {
  let component: ListaEsquemaConductorPage;
  let fixture: ComponentFixture<ListaEsquemaConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsquemaConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
