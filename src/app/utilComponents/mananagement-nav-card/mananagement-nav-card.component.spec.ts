import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MananagementNavCardComponent } from './mananagement-nav-card.component';

describe('MananagementNavCardComponent', () => {
  let component: MananagementNavCardComponent;
  let fixture: ComponentFixture<MananagementNavCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MananagementNavCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MananagementNavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
