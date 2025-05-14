import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SleepEntry {
  date: string;
  hours: number;
}

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css'],
})
export class SleepComponent implements OnInit {
  sleepData: SleepEntry[] = [];
  date: string = '';
  hours: number | null = null;
  errorMessage: string = '';

  ngOnInit() {
    const savedData = localStorage.getItem('sleepData');
    if (savedData) {
      this.sleepData = JSON.parse(savedData);
      this.sortSleepData();
    }
    this.setDefaultDate();
  }

  setDefaultDate() {
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
  }

  addEntry() {
    if (
      !this.date ||
      this.hours === null ||
      this.hours < 0 ||
      this.hours > 24
    ) {
      this.errorMessage = 'Please enter a valid number of hours (0–24).';
      return;
    }

    this.sleepData.push({ date: this.date, hours: this.hours });
    this.sortSleepData();
    this.saveToLocalStorage();
    this.date = '';
    this.hours = null;
    this.setDefaultDate();
    this.errorMessage = '';
  }

  deleteEntry(index: number) {
    this.sleepData.splice(index, 1);
    this.saveToLocalStorage();
  }

  clearEntries() {
    this.sleepData = [];
    localStorage.removeItem('sleepData');
  }

  saveToLocalStorage() {
    localStorage.setItem('sleepData', JSON.stringify(this.sleepData));
  }

  sortSleepData() {
    this.sleepData.sort((a, b) => b.date.localeCompare(a.date));
  }

  get totalAverageHours(): number {
    if (this.sleepData.length === 0) return 0;
    const total = this.sleepData.reduce((sum, entry) => sum + entry.hours, 0);
    return +(total / this.sleepData.length).toFixed(2);
  }

  get weeklyAverageHours(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const recentEntries = this.sleepData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= oneWeekAgo;
    });

    if (recentEntries.length === 0) return 0;

    const total = recentEntries.reduce((sum, entry) => sum + entry.hours, 0);
    return +(total / recentEntries.length).toFixed(2);
  }

  get weeklyEntryCount(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    return this.sleepData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= oneWeekAgo;
    }).length;
  }
}
