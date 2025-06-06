import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCombustiblePage } from './editar-combustible.page';

describe('EditarCombustiblePage', () => {
  let component: EditarCombustiblePage;
  let fixture: ComponentFixture<EditarCombustiblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCombustiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
