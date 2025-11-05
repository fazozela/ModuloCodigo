import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/user-list/user-list')
  },
  {
    path: 'create-user',
    loadComponent: () => import('./components/user-create/user-create')
  },
  {
    path: ':id',
    loadComponent: () => import('./components/user-by-id/user-by-id')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default userRoutes;