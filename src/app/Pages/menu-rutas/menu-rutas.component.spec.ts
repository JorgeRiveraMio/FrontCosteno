import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRutasComponent } from './menu-rutas.component';

describe('MenuRutasComponent', () => {
  let component: MenuRutasComponent;
  let fixture: ComponentFixture<MenuRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
