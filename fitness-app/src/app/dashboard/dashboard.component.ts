import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sleepAverage: number = 0;
  latestWeight: number = 0;
  totalEvents: number = 0;
  totalDistance: number = 0;
  preferredUnit: string = 'Miles';
  waterToday: number = 0;
  caloriesToday: number = 0;
  friendCount: number = 0;
  profileName: string = '';

  ngOnInit(): void {
    this.loadSleepData();
    this.loadWeightData();
    this.loadPlannerData();
    this.loadDistanceData();
    this.loadNutritionData();
    this.loadSocialData();
  }

  loadSleepData() {
    const data = localStorage.getItem('sleepData');
    if (data) {
      const entries = JSON.parse(data);
      const last7 = entries.slice(-7);
      const total = last7.reduce((sum: number, e: any) => sum + e.hours, 0);
      this.sleepAverage = last7.length ? Math.round((total / last7.length) * 10) / 10 : 0;
    }
  }

  loadWeightData() {
    const data = localStorage.getItem('weights');
    if (data) {
      const weights = JSON.parse(data);
      this.latestWeight = weights.length ? weights[weights.length - 1] : 0;
    }
  }

  loadPlannerData() {
    const data = localStorage.getItem('plannerEvents');
    if (data) {
      const events = JSON.parse(data);
      this.totalEvents = Object.values(events).reduce((count: number, list: any) => count + list.length, 0);
    }
  }

  loadDistanceData() {
    const data = localStorage.getItem('distanceEntries');
    if (data) {
      const entries = JSON.parse(data);
      this.totalDistance = entries.reduce((sum: number, e: any) => sum + Number(e.distance || 0), 0);
    }
    this.preferredUnit = localStorage.getItem('preferredUnit') || 'Miles';
  }

  loadNutritionData() {
    const data = localStorage.getItem('nutritionEntries');
    if (data) {
      const today = new Date().toISOString().split('T')[0];
      const entries = JSON.parse(data);
      this.waterToday = 0;
      this.caloriesToday = 0;
      for (const entry of entries) {
        if (entry.date === today) {
          this.waterToday += Number(entry.water || 0);
          this.caloriesToday += Number(entry.calories || 0);
        }
      }
    }
  }

  loadSocialData() {
    const profile = localStorage.getItem('socialProfile');
    const friends = localStorage.getItem('friendsList');
    if (profile) {
      const parsed = JSON.parse(profile);
      this.profileName = parsed.name || '';
    }
    if (friends) {
      const list = JSON.parse(friends);
      this.friendCount = list.length;
    }
  }
}
