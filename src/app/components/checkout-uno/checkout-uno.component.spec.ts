import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutUnoComponent } from './checkout-uno.component';

describe('CheckoutUnoComponent', () => {
  let component: CheckoutUnoComponent;
  let fixture: ComponentFixture<CheckoutUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutUnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
