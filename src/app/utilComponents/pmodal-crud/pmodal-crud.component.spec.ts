import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmodalCrudComponent } from './pmodal-crud.component';

describe('PmodalCrudComponent', () => {
  let component: PmodalCrudComponent;
  let fixture: ComponentFixture<PmodalCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmodalCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmodalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
