import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightTrackerComponent } from '../weight-tracker/weight-tracker.component';

import { NutritionTrackerComponent } from './nutrition-tracker.component';

describe('NutritionTrackerComponent', () => {
  let component: NutritionTrackerComponent;
  let fixture: ComponentFixture<NutritionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionTrackerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
