import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/dashboard' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Graphics', url: '/dashboard/graphics' },
      ],
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: '/dashboard/users' },
        { title: 'Hospitals', url: '/dashboard/hospitals' },
        { title: 'Doctors', url: '/dashboard/doctors' },
      ],
    },
  ];

  constructor() {}
}
