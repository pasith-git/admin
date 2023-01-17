import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInOutComponent } from './stock-in-out.component';

describe('StockInOutComponent', () => {
  let component: StockInOutComponent;
  let fixture: ComponentFixture<StockInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
