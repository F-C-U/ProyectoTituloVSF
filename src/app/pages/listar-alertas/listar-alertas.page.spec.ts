import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarAlertasPage } from './listar-alertas.page';

describe('ListarAlertasPage', () => {
  let component: ListarAlertasPage;
  let fixture: ComponentFixture<ListarAlertasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAlertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
