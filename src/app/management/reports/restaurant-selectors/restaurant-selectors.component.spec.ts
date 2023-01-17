import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSelectorsComponent } from './restaurant-selectors.component';

describe('RestaurantSelectorsComponent', () => {
  let component: RestaurantSelectorsComponent;
  let fixture: ComponentFixture<RestaurantSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantSelectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
