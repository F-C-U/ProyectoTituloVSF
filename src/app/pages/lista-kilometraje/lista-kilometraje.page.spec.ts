import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaKilometrajePage } from './lista-kilometraje.page';

describe('ListaKilometrajePage', () => {
  let component: ListaKilometrajePage;
  let fixture: ComponentFixture<ListaKilometrajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaKilometrajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
