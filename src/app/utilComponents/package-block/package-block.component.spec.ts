import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageBlockComponent } from './package-block.component';

describe('PackageBlockComponent', () => {
  let component: PackageBlockComponent;
  let fixture: ComponentFixture<PackageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
