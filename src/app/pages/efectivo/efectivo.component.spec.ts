import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectivoComponent } from './efectivo.component';

describe('EfectivoComponent', () => {
  let component: EfectivoComponent;
  let fixture: ComponentFixture<EfectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EfectivoComponent]
    });
    fixture = TestBed.createComponent(EfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
