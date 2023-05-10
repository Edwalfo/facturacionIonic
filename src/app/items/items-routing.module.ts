import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsPage } from './items.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {
    path: 'crear-item',
    loadChildren: () => import('./crear-item/crear-item.module').then( m => m.CrearItemPageModule)
  },
  {
    path: 'edictar-item/:id',
    loadChildren: () => import('./crear-item/crear-item.module').then( m => m.CrearItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsPageRoutingModule {}
