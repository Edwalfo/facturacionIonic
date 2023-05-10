import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FacturacionPageRoutingModule } from './facturacion-routing.module';
import { FacturacionPage } from './facturacion.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturacionPageRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  declarations: [FacturacionPage]
})
export class FacturacionPageModule {}
