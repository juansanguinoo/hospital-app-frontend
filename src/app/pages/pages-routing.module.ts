import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { CardDoctorComponent } from './maintenance/doctors/card-doctor/card-doctor.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress Bar' },
      },
      {
        path: 'graphics',
        component: GraphicsComponent,
        data: { title: 'Graphics' },
      },
      {
        path: 'account',
        component: AccountComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Usuarios' },
        canActivate: [adminGuard],
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitales' },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Hospitales' },
      },
      {
        path: 'doctors/:id',
        component: CardDoctorComponent,
        data: { title: 'Hospitales' },
      },
      {
        path: 'search/:value',
        component: SearchComponent,
        data: { title: 'Search' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
