import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasPagoComponent } from './formas-pago.component';

describe('FormasPagoComponent', () => {
  let component: FormasPagoComponent;
  let fixture: ComponentFixture<FormasPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormasPagoComponent]
    });
    fixture = TestBed.createComponent(FormasPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
