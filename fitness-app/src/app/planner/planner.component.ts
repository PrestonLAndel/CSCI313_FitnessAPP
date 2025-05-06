import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: (Date | null)[] = [];
  events: { [date: string]: string[] } = {};

  // Dialog state
  showDialog: boolean = false;
  selectedDay: Date | null = null;
  eventTitle: string = '';
  eventDescription: string = '';

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Pad empty days for calendar alignment
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    this.daysInMonth = days;
  }

  changeMonth(offset: number) {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + offset));
    this.generateCalendar();
  }

  openDialog(day: Date) {
    this.selectedDay = day;
    this.eventTitle = '';
    this.eventDescription = '';
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  addEvent() {
    if (!this.selectedDay) return;

    const dateKey = this.selectedDay.toISOString().split('T')[0];
    const entry = `${this.eventTitle}${this.eventDescription ? ': ' + this.eventDescription : ''}`;

    if (!this.events[dateKey]) {
      this.events[dateKey] = [];
    }

    this.events[dateKey].push(entry);
    this.showDialog = false;
  }
}
