import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroKilometrajeComponent } from './registro-kilometraje.component';

describe('RegistroKilometrajeComponent', () => {
  let component: RegistroKilometrajeComponent;
  let fixture: ComponentFixture<RegistroKilometrajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroKilometrajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroKilometrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
