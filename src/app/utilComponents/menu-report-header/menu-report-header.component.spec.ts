import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportHeaderComponent } from './menu-report-header.component';

describe('MenuReportHeaderComponent', () => {
  let component: MenuReportHeaderComponent;
  let fixture: ComponentFixture<MenuReportHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReportHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
