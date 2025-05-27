import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroCombustiblePage } from './registro-combustible.page';

describe('RegistroCombustiblePage', () => {
  let component: RegistroCombustiblePage;
  let fixture: ComponentFixture<RegistroCombustiblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCombustiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
