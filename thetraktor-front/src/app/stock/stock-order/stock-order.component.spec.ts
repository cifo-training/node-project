import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOrderComponent } from './stock-order.component';

describe('StockOrderComponent', () => {
  let component: StockOrderComponent;
  let fixture: ComponentFixture<StockOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
