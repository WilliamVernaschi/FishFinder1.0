import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'devicesList',
        loadComponent: () =>
          import('../devices-list/devices-list.page').then((m) => m.DevicesList),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: '',
        redirectTo: '/tabs/devicesList',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/devicesList',
    pathMatch: 'full',
  },
];
