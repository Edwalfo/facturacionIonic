import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./crear-productos/crear-productos.module').then( m => m.CrearProductosPageModule)
  },
  {
    path: 'edictar-producto/:id',
    loadChildren: () => import('./crear-productos/crear-productos.module').then( m => m.CrearProductosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
