import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  private weights: number[] = [];
  private numberOfWeights: number[] = [];
  private dateArray: string[] = [];

  constructor() {
    this.loadFromLocalStorage(); // Load stored data on initialization
  }

  private saveToLocalStorage() {
    localStorage.setItem('weights', JSON.stringify(this.weights));
    localStorage.setItem(
      'numberOfWeights',
      JSON.stringify(this.numberOfWeights)
    );
    localStorage.setItem('dateArray', JSON.stringify(this.dateArray));
  }

  private loadFromLocalStorage() {
    const storedWeights = localStorage.getItem('weights');
    const storedNumbers = localStorage.getItem('numberOfWeights');
    const storedDates = localStorage.getItem('dateArray');

    if (storedWeights) {
      this.weights = JSON.parse(storedWeights);
    }
    if (storedNumbers) {
      this.numberOfWeights = JSON.parse(storedNumbers);
    }
    if (storedDates) {
      this.dateArray = JSON.parse(storedDates);
    }
  }

  addWeight(num: number) {
    this.weights.push(num);
    this.saveToLocalStorage();
  }

  getWeights(): number[] {
    return this.weights.slice(-7);
  }

  addNumberOfWeights() {
    let currentNumber = this.numberOfWeights.length;
    this.numberOfWeights.push(currentNumber + 1);
    this.saveToLocalStorage();
  }

  getNumberOfWeights(): number[] {
    return this.numberOfWeights;
  }

  numToString(num: number[]): string[] {
    return num.map((n) => n.toString());
  }

  getLastWeight(): number {
    return this.weights[this.weights.length - 1];
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  }

  addDateToArray() {
    this.dateArray.push(this.getCurrentDate());
    this.saveToLocalStorage();
  }

  getDateArray(): string[] {
    return this.dateArray.slice(-7);
  }

  clearStoredData() {
    localStorage.removeItem('weights');
    localStorage.removeItem('numberOfWeights');
    localStorage.removeItem('dateArray');
    this.weights = [];
    this.numberOfWeights = [];
    this.dateArray = [];
  }
}
