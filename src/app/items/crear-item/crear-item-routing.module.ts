import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearItemPage } from './crear-item.page';

const routes: Routes = [
  {
    path: '',
    component: CrearItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearItemPageRoutingModule {}
