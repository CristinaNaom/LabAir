import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDueComponent } from './checkout-due.component';

describe('CheckoutDueComponent', () => {
  let component: CheckoutDueComponent;
  let fixture: ComponentFixture<CheckoutDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutDueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
