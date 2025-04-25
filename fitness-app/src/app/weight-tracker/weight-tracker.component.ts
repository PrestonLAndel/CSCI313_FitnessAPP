import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { WeightService } from '../weight.service';

@Component({
  selector: 'app-weight-tracker',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './weight-tracker.component.html',
  styleUrl: './weight-tracker.component.css',
})
export class WeightTrackerComponent implements AfterViewInit {
  inputWeight: number | null = null;
  chart: Chart | null = null;
  public goalWeight = 165;

  constructor(public weightservice: WeightService) {}

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;

    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.weightservice.numToString(
            this.weightservice.getNumberOfWeights()
          ),
          datasets: [
            {
              label: 'Weight (lbs)',
              data: this.weightservice.getWeights(),
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              pointBorderColor: 'red',
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else {
      console.error('Canvas element with id "lineChart" not found!');
    }
  }

  public weightToGo = 0;

  submitWeight(): void {
    if (this.inputWeight !== null) {
      // Add weight and update weight count
      this.weightservice.addWeight(this.inputWeight);
      this.weightservice.addNumberOfWeights();

      // Update the chart if it exists
      if (this.chart) {
        this.chart.data.labels = this.weightservice.numToString(
          this.weightservice.getNumberOfWeights()
        );
        this.chart.data.datasets[0].data = this.weightservice.getWeights();
        this.chart.update();
      }
    }
    this.weightToGo = this.weightservice.getLastWeight() - this.goalWeight;
  }
}
