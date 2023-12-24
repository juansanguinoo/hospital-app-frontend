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
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from '../pipes/pipes.module';
import { CardDoctorComponent } from './maintenance/doctors/card-doctor/card-doctor.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    CardDoctorComponent,
    SearchComponent,
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
    PipesModule,
  ],
})
export class PagesModule {}
