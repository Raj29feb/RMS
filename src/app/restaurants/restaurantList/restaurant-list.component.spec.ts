import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant-list.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantComponent],
    });
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
