import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { HandlerComponent } from './handler/handler.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { ModalImagesComponent } from './modal-images/modal-images.component';

@NgModule({
  declarations: [HandlerComponent, DonutChartComponent, ModalImagesComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [HandlerComponent, DonutChartComponent, ModalImagesComponent],
})
export class ComponentsModule {}
