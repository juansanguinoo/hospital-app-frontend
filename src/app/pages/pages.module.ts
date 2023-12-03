import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ComponentsModule } from '../components/components.module';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './maintenance/users/users.component';
import { FormsModule } from '@angular/forms';
import { ModalImagesComponent } from '../components/modal-images/modal-images.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountComponent,
    ProfileComponent,
    UsersComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
