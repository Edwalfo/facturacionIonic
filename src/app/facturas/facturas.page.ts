import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../services/http.service';
import { Factura } from '../models/factura.model';
import { usuario } from '../models/usuario.model';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {
  facturas: Factura[] = [];
  usuarios: usuario[] = [];
  subscription: Subscription | undefined;

  constructor(
    private _httpServices: HttpService
  ) { }

  ngOnInit() {
    this.getfacturas();
    this.getUsuarios();
    this.subscription = this._httpServices.refresh$.subscribe(() => {
      this.getfacturas();
      this.getUsuarios();

    })
  }

  getfacturas() {
    this._httpServices.get<Factura>('facturas').subscribe((res) => {
      this.facturas = [];

      this.facturas = res.data;
    /*   console.log(this.facturas, 'facturas'); */

    }, (error) => {
      console.log(error);

    })

  }

  getUsuarios() {
    this._httpServices.get<usuario>('users').subscribe((res) => {
      this.usuarios = [];

      this.usuarios = res.data;
     /*  console.log(this.usuarios, 'usuarios'); */

    }, (error) => {
      console.log(error);

    })

  }

}
