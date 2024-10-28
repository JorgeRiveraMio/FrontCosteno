import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionRutasComponent } from './seleccion-rutas.component';

describe('SeleccionRutasComponent', () => {
  let component: SeleccionRutasComponent;
  let fixture: ComponentFixture<SeleccionRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
