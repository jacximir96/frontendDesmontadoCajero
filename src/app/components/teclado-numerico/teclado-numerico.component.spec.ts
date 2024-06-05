import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecladoNumericoComponent } from './teclado-numerico.component';

describe('TecladoNumericoComponent', () => {
  let component: TecladoNumericoComponent;
  let fixture: ComponentFixture<TecladoNumericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecladoNumericoComponent]
    });
    fixture = TestBed.createComponent(TecladoNumericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
