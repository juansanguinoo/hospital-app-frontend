import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styles: [
    `
      .card-body {
        max-height: 400px !important;
        margin: 0 auto;
      }
    `,
  ],
})
export class DonutChartComponent {
  @Input() title: string = 'Untitled';

  @Input('labels') doughnutChartLabels: string[] = ['Empty', 'Empty', 'Empty'];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [350, 450, 100] }],
  };
}
