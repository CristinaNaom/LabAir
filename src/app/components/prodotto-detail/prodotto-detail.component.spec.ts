import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottoDetailComponent } from './prodotto-detail.component';

describe('ProdottoDetailComponent', () => {
  let component: ProdottoDetailComponent;
  let fixture: ComponentFixture<ProdottoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdottoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdottoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
