import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SleepEntry {
  date: string;
  hours: number;
}

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {
  sleepData: SleepEntry[] = [];
  hours: number = 0;
  date: string = '';

  ngOnInit(): void {
    // Load data from localStorage
    const saved = localStorage.getItem('sleepData');
    if (saved) {
      this.sleepData = JSON.parse(saved);
    }
    this.date = this.getYesterdayDate();
  }

  addEntry() {
    if (this.hours > 0 && this.date) {
      const numericHours = Number(this.hours); // Ensure hours is a number
      this.sleepData.push({ date: this.date, hours: numericHours });
      // Save to localStorage
      localStorage.setItem('sleepData', JSON.stringify(this.sleepData));
      this.hours = 0;
      this.date = this.getYesterdayDate();
    }
  }

  clearSleepData() {
    // Clear all sleep data and reset localStorage
    this.sleepData = [];
    localStorage.removeItem('sleepData');
  }

  getYesterdayDate(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }
}
