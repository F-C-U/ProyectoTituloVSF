import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEsquemasPage } from './lista-esquemas.page';

describe('ListaEsquemasPage', () => {
  let component: ListaEsquemasPage;
  let fixture: ComponentFixture<ListaEsquemasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsquemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
