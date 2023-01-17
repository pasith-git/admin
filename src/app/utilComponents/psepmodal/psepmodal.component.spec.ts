import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsepmodalComponent } from './psepmodal.component';

describe('PsepmodalComponent', () => {
  let component: PsepmodalComponent;
  let fixture: ComponentFixture<PsepmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsepmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsepmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
