import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCategoriaPageRoutingModule } from './crear-categoria-routing.module';

import { CrearCategoriaPage } from './crear-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCategoriaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearCategoriaPage]
})
export class CrearCategoriaPageModule {}
