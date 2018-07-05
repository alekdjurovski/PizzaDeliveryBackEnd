import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoumadeComponent } from './youmade.component';

describe('YoumadeComponent', () => {
  let component: YoumadeComponent;
  let fixture: ComponentFixture<YoumadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoumadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoumadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
