import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarKilometrajePage } from './editar-kilometraje.page';

describe('EditarKilometrajePage', () => {
  let component: EditarKilometrajePage;
  let fixture: ComponentFixture<EditarKilometrajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarKilometrajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
