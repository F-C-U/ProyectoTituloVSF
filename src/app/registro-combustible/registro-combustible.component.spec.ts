import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroCombustibleComponent } from './registro-combustible.component';

describe('RegistroCombustibleComponent', () => {
  let component: RegistroCombustibleComponent;
  let fixture: ComponentFixture<RegistroCombustibleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroCombustibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
