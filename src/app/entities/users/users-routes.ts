import { PluralComponent } from './plural/plural.component';
import { Routes } from '@angular/router';
import { SingularComponent } from './singular/singular.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: PluralComponent,
    title: 'Users',
  },
  {
    path: 'user',
    component: SingularComponent,
    title: 'User',
  },
  {
    path: 'user/:id',
    component: SingularComponent,
    title: 'User',
  },
];
