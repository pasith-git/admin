import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmodalComponent } from './pmodal.component';

describe('PmodalComponent', () => {
  let component: PmodalComponent;
  let fixture: ComponentFixture<PmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
