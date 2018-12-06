import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelItemComponent } from './car-model-item.component';

describe('CarModelItemComponent', () => {
  let component: CarModelItemComponent;
  let fixture: ComponentFixture<CarModelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarModelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
