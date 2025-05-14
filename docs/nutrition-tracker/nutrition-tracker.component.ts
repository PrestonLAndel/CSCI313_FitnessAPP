import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NutritionEntry {
  date: string;
  water: number;
  calories: number;
}

@Component({
  selector: 'app-nutrition-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nutrition-tracker.component.html',
  styleUrls: ['./nutrition-tracker.component.css'],
})
export class NutritionTrackerComponent implements OnInit {
  water: number = 0;
  calories: number = 0;
  entries: NutritionEntry[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('nutritionEntries');
    this.entries = saved ? JSON.parse(saved) : [];
  }

  addEntry() {
    const today = new Date().toISOString().split('T')[0];

    // Prevent duplicate for same date
    const existingIndex = this.entries.findIndex((e) => e.date === today);
    if (existingIndex !== -1) {
      this.entries[existingIndex].water = this.water;
      this.entries[existingIndex].calories = this.calories;
    } else {
      this.entries.push({
        date: today,
        water: this.water,
        calories: this.calories,
      });
    }

    this.save();
    this.water = 0;
    this.calories = 0;
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.save();
  }

  save() {
    localStorage.setItem('nutritionEntries', JSON.stringify(this.entries));
  }

  getAverageCalories(): number {
    if (this.entries.length === 0) return 0;
    const total = this.entries.reduce((sum, e) => sum + e.calories, 0);
    return Math.round(total / this.entries.length);
  }

  getAverageWater(): number {
    if (this.entries.length === 0) return 0;
    const total = this.entries.reduce((sum, e) => sum + e.water, 0);
    return Math.round(total / this.entries.length);
  }
}
