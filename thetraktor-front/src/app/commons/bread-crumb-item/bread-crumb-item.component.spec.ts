import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbItemComponent } from './bread-crumb-item.component';

describe('BreadCrumbItemComponent', () => {
  let component: BreadCrumbItemComponent;
  let fixture: ComponentFixture<BreadCrumbItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumbItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
