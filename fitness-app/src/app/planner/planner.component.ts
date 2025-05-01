import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  title: string;
  description: string;
}

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: (Date | null)[] = [];  // Holds the actual days or null for empty slots
  events: { [key: string]: Event[] } = {}; // Store events by date

  selectedDay: Date | null = null; // To keep track of the selected day for event input
  eventTitle: string = ''; // For binding with ngModel (event title input)
  eventDescription: string = ''; // For binding with ngModel (event description input)

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents(); // Optional: Load any events from localStorage if any
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Array to hold the days in the current month
    this.daysInMonth = [];

    // Calculate how many empty days to add before the 1st day of the month
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Add empty slots before the 1st of the month (to align with the correct weekday)
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.push(null); // Empty days to align with the correct weekday
    }

    // Add actual days in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.daysInMonth.push(new Date(year, month, day));
    }

    // If there are more than 35 days (5 full weeks), pad the calendar with empty days
    while (this.daysInMonth.length < 42) {
      this.daysInMonth.push(null); // Add padding to fill the last row if necessary
    }
  }

  changeMonth(direction: number) {
    const newMonth = this.currentMonth.getMonth() + direction;
    this.currentMonth = new Date(this.currentMonth.setMonth(newMonth));
    this.generateCalendar();
  }

  openEventDialog(day: Date) {
    this.selectedDay = day; // Set the selected day
    this.eventTitle = ''; // Reset the form inputs
    this.eventDescription = '';
  }

  addEvent(date: Date, title: string, description: string) {
    const dateString = date.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
    if (!this.events[dateString]) {
      this.events[dateString] = [];
    }
    this.events[dateString].push({ title, description });
    localStorage.setItem('plannerEvents', JSON.stringify(this.events)); // Save to localStorage
  }

  loadEvents() {
    const savedEvents = localStorage.getItem('plannerEvents');
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }
}
