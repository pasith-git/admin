import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdropdownComponent } from './pdropdown.component';

describe('PdropdownComponent', () => {
  let component: PdropdownComponent;
  let fixture: ComponentFixture<PdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
