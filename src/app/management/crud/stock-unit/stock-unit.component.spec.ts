import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUnitComponent } from './stock-unit.component';

describe('StockUnitComponent', () => {
  let component: StockUnitComponent;
  let fixture: ComponentFixture<StockUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
