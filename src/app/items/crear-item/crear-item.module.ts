import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearItemPageRoutingModule } from './crear-item-routing.module';

import { CrearItemPage } from './crear-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearItemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearItemPage]
})
export class CrearItemPageModule {}
