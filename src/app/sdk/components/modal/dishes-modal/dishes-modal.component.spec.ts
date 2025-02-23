import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesModalComponent } from './dishes-modal.component';

describe('DishesModalComponent', () => {
  let component: DishesModalComponent;
  let fixture: ComponentFixture<DishesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishesModalComponent]
    });
    fixture = TestBed.createComponent(DishesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
