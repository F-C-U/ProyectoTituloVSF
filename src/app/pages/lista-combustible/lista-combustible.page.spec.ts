import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCombustiblePage } from './lista-combustible.page';

describe('ListaCombustiblePage', () => {
  let component: ListaCombustiblePage;
  let fixture: ComponentFixture<ListaCombustiblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCombustiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
