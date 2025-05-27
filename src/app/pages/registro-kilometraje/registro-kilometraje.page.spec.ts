import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroKilometrajePage } from './registro-kilometraje.page';

describe('RegistroKilometrajePage', () => {
  let component: RegistroKilometrajePage;
  let fixture: ComponentFixture<RegistroKilometrajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroKilometrajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
