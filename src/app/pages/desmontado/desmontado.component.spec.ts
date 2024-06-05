import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesmontadoComponent } from './desmontado.component';

describe('DesmontadoComponent', () => {
  let component: DesmontadoComponent;
  let fixture: ComponentFixture<DesmontadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesmontadoComponent]
    });
    fixture = TestBed.createComponent(DesmontadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
