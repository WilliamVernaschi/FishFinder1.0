import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'no-device-detected',
    loadComponent: () => import('./no-device-detected/no-device-detected.page').then( m => m.NoDeviceDetectedPage)
  },

];
