import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarMantencionPage } from './confirmar-mantencion.page';

describe('ConfirmarMantencionPage', () => {
  let component: ConfirmarMantencionPage;
  let fixture: ComponentFixture<ConfirmarMantencionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarMantencionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
