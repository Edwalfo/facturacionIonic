import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../services/http.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  subscription: Subscription | undefined;

  constructor(
    private _httpServices: HttpService
  ) {

  }

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
    this.subscription = this._httpServices.refresh$.subscribe(() => {
      this.getProductos();
      this.getCategorias();
    })
  }

  getProductos() {
    this._httpServices.get<Producto>('productos').subscribe(
      {
        next: res => {
          this.productos = [];

          this.productos = res.data;
        /*   console.log(this.productos, 'Productos'); */

        },
        error: error => {
          console.log(error);

        }
      });
  }

  eliminarProducto(id: any) {
    this._httpServices.delete(id, 'productos').subscribe(

      {
        next: () => {
          console.log('Producto eliminado');

        },
        error: error => {
          console.log(error);

        }
      });

  }

  getCategorias() {
    this._httpServices.get<Categoria>('categorias').subscribe(res => {
      this.categorias = [];
      this.categorias = res.data;

    })
  }

}
