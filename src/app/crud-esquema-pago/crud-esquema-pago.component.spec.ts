import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudEsquemaPagoComponent } from './crud-esquema-pago.component';

describe('CrudEsquemaPagoComponent', () => {
  let component: CrudEsquemaPagoComponent;
  let fixture: ComponentFixture<CrudEsquemaPagoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CrudEsquemaPagoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudEsquemaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
