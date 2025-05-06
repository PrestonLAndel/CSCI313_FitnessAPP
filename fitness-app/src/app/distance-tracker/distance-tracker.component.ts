import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DistanceEntry {
  date: string;
  type: string;
  distance: number;
  time: number;
  unit: string;
}

@Component({
  selector: 'app-distance-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distance-tracker.component.html',
  styleUrls: ['./distance-tracker.component.css']
})
export class DistanceTrackerComponent implements OnInit {
  activityTypes: string[] = [
    'Walking', 'Running', 'Jogging', 'Sprinting', 'Biking', 'Swimming', 'Rowing', 'Kayaking'
  ];
  selectedType: string = 'Walking';
  distance: number = 0;
  time: number = 0;
  unit: string = 'Miles';
  entries: DistanceEntry[] = [];

  sortField: string = 'date';
  sortOptions: string[] = ['date', 'distance', 'time', 'type'];

  ngOnInit() {
    const saved = localStorage.getItem('distanceEntries');
    this.entries = saved ? JSON.parse(saved) : [];
  }

  addEntry() {
    const today = new Date().toISOString().split('T')[0];

    this.entries.push({
      date: today,
      type: this.selectedType,
      distance: this.distance,
      time: this.time,
      unit: this.unit
    });

    this.save();

    this.distance = 0;
    this.time = 0;
    this.selectedType = 'Walking';
    this.unit = 'Miles';
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.save();
  }

  save() {
    localStorage.setItem('distanceEntries', JSON.stringify(this.entries));
  }

  getSortedEntries(): DistanceEntry[] {
    return [...this.entries].sort((a, b) => {
      const valA = a[this.sortField as keyof DistanceEntry];
      const valB = b[this.sortField as keyof DistanceEntry];

      if (typeof valA === 'string') {
        return valA.localeCompare(valB as string);
      }

      return (valA as number) - (valB as number);
    });
  }

  getPace(entry: DistanceEntry): string {
    if (entry.distance === 0) return 'N/A';
    const pace = entry.time / entry.distance;
    return pace.toFixed(2) + ' min/' + entry.unit.toLowerCase();
  }
}
