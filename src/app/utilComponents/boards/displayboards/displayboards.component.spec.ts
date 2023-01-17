import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayboardsComponent } from './displayboards.component';

describe('DisplayboardsComponent', () => {
  let component: DisplayboardsComponent;
  let fixture: ComponentFixture<DisplayboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
