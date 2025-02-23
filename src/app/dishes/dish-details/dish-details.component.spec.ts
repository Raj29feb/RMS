import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDetailsComponent } from './dish-details.component';

describe('DishDetailsComponent', () => {
  let component: DishDetailsComponent;
  let fixture: ComponentFixture<DishDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishDetailsComponent]
    });
    fixture = TestBed.createComponent(DishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
