import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformesPage } from './informes.page';

describe('InformesPage', () => {
  let component: InformesPage;
  let fixture: ComponentFixture<InformesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
