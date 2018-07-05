import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentIngredientsComponent } from './managment-ingredients.component';

describe('ManagmentIngredientsComponent', () => {
  let component: ManagmentIngredientsComponent;
  let fixture: ComponentFixture<ManagmentIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
