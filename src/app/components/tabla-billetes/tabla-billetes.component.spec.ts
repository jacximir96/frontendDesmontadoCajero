import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBilletesComponent } from './tabla-billetes.component';

describe('TablaBilletesComponent', () => {
  let component: TablaBilletesComponent;
  let fixture: ComponentFixture<TablaBilletesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaBilletesComponent]
    });
    fixture = TestBed.createComponent(TablaBilletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
