import { Routes } from '@angular/router';
import '@angular/localize/init';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./filter.component').then(m => m.FilterComponent),
    title: 'Products',
  }
];

