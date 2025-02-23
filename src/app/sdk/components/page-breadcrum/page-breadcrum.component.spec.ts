import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBreadcrumComponent } from './page-breadcrum.component';

describe('PageBreadcrumComponent', () => {
  let component: PageBreadcrumComponent;
  let fixture: ComponentFixture<PageBreadcrumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageBreadcrumComponent]
    });
    fixture = TestBed.createComponent(PageBreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
