import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFormaPagoComponent } from './agregar-forma-pago.component';

describe('AgregarFormaPagoComponent', () => {
  let component: AgregarFormaPagoComponent;
  let fixture: ComponentFixture<AgregarFormaPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarFormaPagoComponent]
    });
    fixture = TestBed.createComponent(AgregarFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
