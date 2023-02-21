import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Angular Standalone - Home',
    children: [
      {
        path: '',
        redirectTo: 'angular',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@entities/users/users-routes').then(u => u.usersRoutes),
      },
      {
        path: 'angular',
        loadComponent: () =>
          import('@pages/angular/angular.component').then(
            c => c.AngularComponent
          ),
      },
    ],
  },
];
