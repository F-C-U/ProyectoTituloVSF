import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroEsquemaPagoComponent } from './registro-esquema-pago.component';

describe('RegistroEsquemaPagoComponent', () => {
  let component: RegistroEsquemaPagoComponent;
  let fixture: ComponentFixture<RegistroEsquemaPagoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroEsquemaPagoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEsquemaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
