import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaPagoComponent } from './valida-pago.component';

describe('ValidaPagoComponent', () => {
  let component: ValidaPagoComponent;
  let fixture: ComponentFixture<ValidaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
