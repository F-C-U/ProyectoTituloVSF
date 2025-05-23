import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaCombustibleComponent } from './lista-combustible.component';

describe('ListaCombustibleComponent', () => {
  let component: ListaCombustibleComponent;
  let fixture: ComponentFixture<ListaCombustibleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaCombustibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
