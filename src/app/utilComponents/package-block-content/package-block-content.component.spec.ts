import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageBlockContentComponent } from './package-block-content.component';

describe('PackageBlockContentComponent', () => {
  let component: PackageBlockContentComponent;
  let fixture: ComponentFixture<PackageBlockContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageBlockContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageBlockContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
