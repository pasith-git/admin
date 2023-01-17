import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachBoardComponent } from './each-board.component';

describe('EachBoardComponent', () => {
  let component: EachBoardComponent;
  let fixture: ComponentFixture<EachBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
