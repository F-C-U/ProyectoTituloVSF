import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearUsuarioPage } from './crear-usuario.page';

describe('CrearUsuarioPage', () => {
  let component: CrearUsuarioPage;
  let fixture: ComponentFixture<CrearUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
