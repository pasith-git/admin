import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBoardComponent } from './branch-board.component';

describe('BranchBoardComponent', () => {
  let component: BranchBoardComponent;
  let fixture: ComponentFixture<BranchBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
