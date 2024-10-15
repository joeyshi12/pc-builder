import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentListingComponent } from './component-listing.component';

describe('ComponentListingComponent', () => {
  let component: ComponentListingComponent;
  let fixture: ComponentFixture<ComponentListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentListingComponent]
    });
    fixture = TestBed.createComponent(ComponentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
