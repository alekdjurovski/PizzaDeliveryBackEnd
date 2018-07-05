import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentOrdersComponent } from './managment-orders.component';

describe('ManagmentOrdersComponent', () => {
  let component: ManagmentOrdersComponent;
  let fixture: ComponentFixture<ManagmentOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
