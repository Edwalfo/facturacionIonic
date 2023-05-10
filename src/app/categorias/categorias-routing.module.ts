import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasPage } from './categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  },
  {
    path: 'crear-categoria',
    loadChildren: () => import('./crear-categoria/crear-categoria.module').then( m => m.CrearCategoriaPageModule)
  },
  {
    path: 'edictar-categoria/:id',
    loadChildren: () => import('./crear-categoria/crear-categoria.module').then( m => m.CrearCategoriaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasPageRoutingModule {}
