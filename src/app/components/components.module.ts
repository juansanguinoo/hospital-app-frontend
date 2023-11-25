import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { HandlerComponent } from './handler/handler.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

@NgModule({
  declarations: [HandlerComponent, DonutChartComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [HandlerComponent, DonutChartComponent],
})
export class ComponentsModule {}
