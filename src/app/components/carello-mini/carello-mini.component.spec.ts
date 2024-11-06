import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarelloMiniComponent } from './carello-mini.component';

describe('CarelloMiniComponent', () => {
  let component: CarelloMiniComponent;
  let fixture: ComponentFixture<CarelloMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarelloMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarelloMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
