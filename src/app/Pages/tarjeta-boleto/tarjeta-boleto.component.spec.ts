import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaBoletoComponent } from './tarjeta-boleto.component';

describe('TarjetaBoletoComponent', () => {
  let component: TarjetaBoletoComponent;
  let fixture: ComponentFixture<TarjetaBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaBoletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
