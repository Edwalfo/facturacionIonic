import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../services/http.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  items: Item[] = [];
  productos: Producto[] = [];
  subscription: Subscription | undefined;

  constructor(
    private _httpServices: HttpService
  ) {

  }

  ngOnInit() {
    this.getItems();
    this.getProductos();
    this.subscription = this._httpServices.refresh$.subscribe(() => {
      this.getItems();
      this.getProductos();
    })
  }
  getItems() {
    this._httpServices.get<Item>('items').subscribe((res) => {
      this.items = [];

      this.items = res.data;
      console.log(this.items, 'items');

    }, (error) => {
      console.log(error);

    })

  }

  eliminarItem(id: any) {
    this._httpServices.delete(id, 'items').subscribe(() => {

      console.log('Item eliminado');

    }, (err) => {
      console.log(err);

    })

  }

  getProductos() {
    this._httpServices.get<Producto>('productos').subscribe((res) => {
      this.productos = [];

      this.productos = res.data;

    }, (error) => {
      console.log(error);

    })
  }




}
