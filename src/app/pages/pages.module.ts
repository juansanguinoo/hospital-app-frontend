import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicsComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicsComponent,
  ],
  imports: [CommonModule, SharedModule, PagesRoutingModule, ComponentsModule],
})
export class PagesModule {}
