import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: (Date | null)[] = [];
  events: { [date: string]: string[] } = {};

  showDialog: boolean = false;
  selectedDay: Date | null = null;
  eventTitle: string = '';
  eventDescription: string = '';

  showEventPopup: boolean = false;
  selectedEvent: string = '';
  selectedEventIndex: number = -1;

  ngOnInit() {
    this.generateCalendar();
    const saved = localStorage.getItem('plannerEvents');
    this.events = saved ? JSON.parse(saved) : {};
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    this.daysInMonth = days;
  }

  changeMonth(offset: number) {
    this.currentMonth = new Date(
      this.currentMonth.setMonth(this.currentMonth.getMonth() + offset)
    );
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
    const entry =
      this.eventTitle +
      (this.eventDescription ? `: ${this.eventDescription}` : '');

    if (!this.events[dateKey]) {
      this.events[dateKey] = [];
    }

    this.events[dateKey].push(entry);
    this.saveEvents();
    this.showDialog = false;
  }

  saveEvents() {
    localStorage.setItem('plannerEvents', JSON.stringify(this.events));
  }

  openEventDetails(day: Date, index: number) {
    const dateKey = day.toISOString().split('T')[0];
    this.selectedDay = day;
    this.selectedEvent = this.events[dateKey][index];
    this.selectedEventIndex = index;
    this.showEventPopup = true;
  }

  closeEventDetails() {
    this.showEventPopup = false;
    this.selectedEvent = '';
    this.selectedEventIndex = -1;
  }

  deleteEvent() {
    if (!this.selectedDay || this.selectedEventIndex === -1) return;

    const dateKey = this.selectedDay.toISOString().split('T')[0];
    this.events[dateKey].splice(this.selectedEventIndex, 1);

    if (this.events[dateKey].length === 0) {
      delete this.events[dateKey];
    }

    this.saveEvents();
    this.closeEventDetails();
  }
}
