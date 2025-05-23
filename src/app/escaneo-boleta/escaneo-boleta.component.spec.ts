import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EscaneoBoletaComponent } from './escaneo-boleta.component';

describe('EscaneoBoletaComponent', () => {
  let component: EscaneoBoletaComponent;
  let fixture: ComponentFixture<EscaneoBoletaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EscaneoBoletaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EscaneoBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
