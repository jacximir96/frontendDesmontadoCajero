import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChicaComponent } from './caja-chica.component';

describe('CajaChicaComponent', () => {
  let component: CajaChicaComponent;
  let fixture: ComponentFixture<CajaChicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CajaChicaComponent]
    });
    fixture = TestBed.createComponent(CajaChicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
