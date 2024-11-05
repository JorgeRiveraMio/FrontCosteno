import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPasajeroComponent } from './menu-pasajero.component';

describe('MenuPasajeroComponent', () => {
  let component: MenuPasajeroComponent;
  let fixture: ComponentFixture<MenuPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPasajeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
