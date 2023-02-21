import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pages/home/home-routes').then(r => r.homeRoutes),
  },
];
