import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './pipes/filtro.pipe';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    FiltroPipe,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltroPipe,

  ]
})
export class SharedModule { }
