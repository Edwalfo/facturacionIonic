import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeGuard } from './shared/guards/home.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [HomeGuard],
  },
  {
    path: 'facturacion',
    loadChildren: () => import('./facturacion/facturacion.module').then(m => m.FacturacionPageModule), canActivate: [AuthGuard],
  },

  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'facturas',
    loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'factura/:id',
    loadChildren: () => import('./facturacion/facturacion.module').then(m => m.FacturacionPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarPageModule), canActivate: [HomeGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
