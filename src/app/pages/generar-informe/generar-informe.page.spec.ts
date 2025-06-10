import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarInformePage } from './generar-informe.page';

describe('GenerarInformePage', () => {
  let component: GenerarInformePage;
  let fixture: ComponentFixture<GenerarInformePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarInformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
