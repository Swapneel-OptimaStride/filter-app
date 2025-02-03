import { Routes } from '@angular/router';
import '@angular/localize/init';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products.component').then(m => m.ProductsComponent),
    title: 'Products',
  }
];

