import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaKilometrajeComponent } from './lista-kilometraje.component';

describe('ListaKilometrajeComponent', () => {
  let component: ListaKilometrajeComponent;
  let fixture: ComponentFixture<ListaKilometrajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaKilometrajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaKilometrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
