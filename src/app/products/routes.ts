import { Routes } from '@angular/router';
import '@angular/localize/init';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component').then(m => m.ProductsComponent),
    title: 'Products',
  }
];

