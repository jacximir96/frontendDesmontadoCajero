import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecladoComponent } from './teclado.component';

describe('TecladoComponent', () => {
  let component: TecladoComponent;
  let fixture: ComponentFixture<TecladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecladoComponent]
    });
    fixture = TestBed.createComponent(TecladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
