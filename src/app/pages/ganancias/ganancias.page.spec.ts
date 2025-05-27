import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GananciasPage } from './ganancias.page';

describe('GananciasPage', () => {
  let component: GananciasPage;
  let fixture: ComponentFixture<GananciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GananciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
