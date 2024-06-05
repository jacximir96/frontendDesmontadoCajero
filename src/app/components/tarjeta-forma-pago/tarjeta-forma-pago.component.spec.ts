import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaFormaPagoComponent } from './tarjeta-forma-pago.component';

describe('TarjetaFormaPagoComponent', () => {
  let component: TarjetaFormaPagoComponent;
  let fixture: ComponentFixture<TarjetaFormaPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaFormaPagoComponent]
    });
    fixture = TestBed.createComponent(TarjetaFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
