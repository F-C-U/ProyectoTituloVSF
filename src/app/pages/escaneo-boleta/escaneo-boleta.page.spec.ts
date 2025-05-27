import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscaneoBoletaPage } from './escaneo-boleta.page';

describe('EscaneoBoletaPage', () => {
  let component: EscaneoBoletaPage;
  let fixture: ComponentFixture<EscaneoBoletaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaneoBoletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
