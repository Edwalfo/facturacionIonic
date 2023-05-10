import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuhidden: boolean = true;
  public appPages: any[] = [];
  subscription: Subscription | undefined;

  constructor(private _authService: AuthService, private router: Router) {
    this._authService.validacionDeSesion();
    this.validarSesion();

  }

 
  cargarMenu() {
    this.appPages = [
      { title: 'Home', url: 'home', icon: 'home', hidden: !this.menuhidden },
      { title: 'Categorias', url: '/categorias', icon: 'ellipse', hidden: !this.menuhidden },
      { title: 'Productos', url: '/productos', icon: 'ellipse', hidden: !this.menuhidden },
      { title: 'Items', url: '/items', icon: 'ellipse', hidden: !this.menuhidden },
      { title: 'Facturas', url: '/facturas', icon: 'ellipse', hidden: !this.menuhidden },
      { title: 'Facturacion', url: '/facturacion', icon: 'ellipse', hidden: !this.menuhidden },
      { title: 'Login', url: '/login', icon: 'people', hidden: this.menuhidden },
      { title: 'Registrar', url: '/registrar', icon: 'people', hidden: this.menuhidden },
    ]

  }
  validarSesion() {

    this._authService.obtenerDatosSesion().subscribe({
      next: res => {
      
       /*  console.log(res, ':token valor'); */

        if (res!="") {
          this.menuhidden = false;
          this.cargarMenu();

        }else{
          this.menuhidden = true;
          this.cargarMenu();
        }
      }
    });


  }


  logout() {
    this._authService.cerrarSesion().then(() => {
      this.router.navigate(['/login']);
    })
  };
}
