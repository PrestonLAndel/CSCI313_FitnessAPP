import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlannerComponent } from './planner/planner.component';
import { SettingsComponent } from './settings/settings.component';
import { WeightTrackerComponent } from './weight-tracker/weight-tracker.component';
import { NutritionTrackerComponent } from './nutrition-tracker/nutrition-tracker.component';
import { SleepComponent } from './sleep/sleep.component';
import { SocialComponent } from './social/social.component';
import { DistanceTrackerComponent } from './distance-tracker/distance-tracker.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'planner', component: PlannerComponent },
  { path: 'weight', component: WeightTrackerComponent },
  { path: 'nutrition', component: NutritionTrackerComponent },
  { path: 'sleep', component: SleepComponent },
  { path: 'social', component: SocialComponent },
  {path: 'distance', component: DistanceTrackerComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
