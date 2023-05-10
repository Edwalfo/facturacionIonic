import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Producto } from '../models/producto.model';
import { Articulo } from '../models/articulo.model';
import { Factura } from '../models/factura.model';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria.model';
import { AuthService } from '../services/auth.service';
import { usuario } from '../models/usuario.model';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {

  titulo: string = 'Facturacion';
  btnDisabled: boolean = false;
  formulario: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  isOpen: boolean = false;


  fecha: Date = new Date;
  consecutivo: number = 0;
  items: Item[] = [];
  productos: Producto[] = [];
  articulos: Articulo[] = [];
  facturas: Factura[] = [];
  categorias: Categoria[] = [];
  usuario: usuario[] = [];
  usuarioNombre: any;

  subtotal: number = 0;
  ivaValor: number = 0.19;
  ivaCalculado: number = 0;
  total: number = 0;
  descuento: number = 0;


  addArticulo: FormGroup;
  formDescuento: FormGroup;
  subscription: Subscription | undefined;
  id: any;

  page: number = 0;
  busqueda: string = '';
  selected: any = 0;

  UID: string = "";


  constructor(
    private _httpServices: HttpService,
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.addArticulo = this.fb.group({
      item_id: ['', Validators.required],
      cantidad: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
    });

    this.formDescuento = this.fb.group({
      descuento: ['', Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');


  }

  ngOnInit() {
    this.getItems();
    this.getProductos();
    this.getCategorias();

    this.calcularSubTotal();
    this.mostrarValorInputDescuento(0);
    this.esEdictar()


    this.subscription = this._httpServices.refresh$.subscribe(() => {
      this.getItems();
      this.getProductos();
      this.getCategorias();
      this.obtenerUltimoNfactura();
    })


  }

  validarSesion() {

    this._authService.obtenerDatosSesion().subscribe({
      next: res => {

        if (res != "") {

          this.obtenerUsuarioId(res);


        }
      }
    });


  }

  obtenerUsuarioId(tk: string) {
    this._authService.currentUser(tk).subscribe({

      next: res => {
        this.UID = res.data;

        console.log(this.UID);

        this.getUsuario(this.UID);
      }
    })
  }

  getUsuario(id:string) {
    this._httpServices.getId<usuario>(id, 'users').subscribe({

      next: res => {

        this.usuarioNombre = res.data.realm
        console.log(res.data.realm);
      }

    })

  }

  agregarEdictarFactura() {

    this.submitted = true;

    if (this.formDescuento.invalid) {
      return;
    }
    if (this.id === null) {
      this.registrarFactura();
    } else {
      this.edictarFactura();
    }

  }

  registrarFactura() {
    const factura: Factura = {
      user_id: this.UID,
      fecha: this.fecha,
      articulos: this.articulos,
      subtotal: this.subtotal,
      iva: this.ivaCalculado,
      descuento: this.descuento,
      total: this.total,
    }
    if (this.articulos.length > 0) {

      this.loading = true;

      this._httpServices.post(factura, 'facturas').subscribe(() => {

        this.limpiarFactura();

        console.log('Factura registrada');
        /*    this.router.navigate(['/facturas']); */


      }, (error => {
        console.log(error);

      }))

    }

  }

  limpiarFactura() {

    this.actualizarItems();
    this.subtotal = 0;
    this.descuento = 0;
    this.total = 0;
    this.ivaCalculado = 0;
    this.mostrarValorInputDescuento(0);
    this.articulos = [];
  }

  edictarFactura() {

    const factura: Factura = {
      user_id: this.UID,
      fecha: this.fecha,
      articulos: this.articulos,
      subtotal: this.subtotal,
      iva: this.ivaCalculado,
      descuento: this.descuento,
      total: this.total
    }
    if (this.articulos.length > 0) {

      this.loading = true;

      this._httpServices.patch(this.id, factura, 'facturas').subscribe(() => {

        this.limpiarFactura();

        /*        console.log('Actualizacion exitosa'); */
        this.router.navigate(['/facturas']);


      }, (error => {
        console.log(error);

      }))

    }


  }

  actualizarItems() {
    for (let index = 0; index < this.items.length; index++) {

      const item: Item = {
        precio: this.items[index].precio,
        stock: this.items[index].stock,
        producto_id: this.items[index].producto_id,
      }
      this.loading = true;
      this._httpServices.patch(this.items[index].id, item, 'items').subscribe(() => {
        this.loading = false;
        /*    console.log('actualizacion exitosa'); */

      })

    }
  }

  eliminarFactura() {
    if (this.articulos.length == 0) {
      this._httpServices.delete(this.id, 'facturas').subscribe(() => {
        /* 
                console.log('Factura eliminada'); */
        this.actualizarItems();
        this.id = null;
        this.router.navigate(['/facturas']);

      }, (err) => {
        console.log(err);

      })
      /*       console.log('se puede eliminar'); */


    }


  }

  getItems() {
    this._httpServices.get<Item>('items').subscribe((res) => {
      this.items = [];

      this.items = res.data;
      /*   console.log(this.items, 'items'); */

    }, (error) => {
      console.log(error);

    })

  }

  getProductos() {
    this._httpServices.get<Producto>('productos').subscribe((res) => {
      this.productos = [];

      this.productos = res.data;
      /*   console.log(this.productos, 'productos'); */

    }, (error) => {
      console.log(error);

    })


  }

  getCategorias() {
    this._httpServices.get<Categoria>('categorias').subscribe(res => {
      this.categorias = [];
      /*     console.log(res.data); */
      this.categorias = res.data;


    })
  }

  obtenerArticulo(id: any) {

    let datoProducto: any[] = [];
    let datoItem: any[] = [];

    let nombre: any;
    let codigo: any;
    let precio: any;


    datoItem = this.items.filter(i => i.producto_id == id);
    datoProducto = this.productos.filter(p => p.id == id);

    datoItem.forEach((element: any) => {
      codigo = element.id;
      precio = element.precio;

    });

    datoProducto.forEach((element: any) => {
      nombre = element.nombre

    });


    this.addArticulo.setValue({
      item_id: codigo,
      cantidad: 1,
      nombre: nombre,
      precio: precio

    })


    this.closeModal()
    this.formulario = true;

  }


  modificarStock(id: any, cant: number, valor: string) {
    const indice = this.items.findIndex(i => i.id == id);
    let newItems = this.items;


    if (valor == 'restar') {

      newItems[indice] = { ...newItems[indice], stock: newItems[indice].stock - cant }

    } else if (valor == 'sumar') {

      newItems[indice] = { ...newItems[indice], stock: newItems[indice].stock + cant }
    }
    this.items = newItems

  }

  agregarArticulo() {

    const articulo: Articulo = {
      item_id: this.addArticulo.value.item_id,
      cantidad: this.addArticulo.value.cantidad,
      nombre: this.addArticulo.value.nombre,
      precio: this.addArticulo.value.precio,
    }



    let busquedad = this.articulos.find(a => a.item_id == this.addArticulo.value.item_id);

    const index = this.items.findIndex(i => i.id == this.addArticulo.value.item_id);
    let newItems = this.items;


    if (this.addArticulo.value.cantidad > newItems[index].stock || this.addArticulo.value.cantidad < 0) {
      this.addArticulo.setValue({
        item_id: articulo.item_id,
        cantidad: 0,
        nombre: articulo.nombre,
        precio: articulo.precio,

      })

      console.log('No puedo agregadr una cantidad mayor al stock');


    } else {
      if (busquedad == null) {
        this.articulos.push(articulo);

      } else {

        const indice = this.articulos.findIndex(i => i.item_id == this.addArticulo.value.item_id);
        let newArticulos = this.articulos;

        newArticulos[indice] = { ...newArticulos[indice], cantidad: newArticulos[indice].cantidad + this.addArticulo.value.cantidad }

        this.articulos = newArticulos;


      }

      /*  console.log(this.articulos, 'articulos lista'); */
      this.formulario = false;
      this.modificarStock(articulo.item_id, articulo.cantidad, 'restar');
      this.calcularSubTotal();
      this.calcularIva();
      this.calcularTotal()

    }

  }

  eliminarArticulo(id: any) {

    let datosArticulos = this.articulos;
    let cant: any;
    this.articulos = datosArticulos.filter(d => d.item_id != id);

    datosArticulos.forEach((element: any) => {
      cant = element.cantidad
    });


    this.modificarStock(id, cant, 'sumar');
    this.calcularSubTotal();
    this.calcularIva();
    this.calcularTotal()


    if (this.articulos.length == 0) {
      this.descuento = 0;
      this.mostrarValorInputDescuento(0);
      this.total = 0
    }

    console.log(this.articulos);

  }

  calcularSubTotal() {

    const suma = this.articulos.map(a => a.precio * a.cantidad).reduce((prev, curr) => prev + curr, 0);
    this.subtotal = suma;

  }

  calcularIva() {
    this.ivaCalculado = this.subtotal * this.ivaValor;
  }

  cancelarForm() {
    this.formulario = false;
  }

  calcularDescuento() {
    this.descuento = this.formDescuento.value.descuento;


    if (this.descuento > this.subtotal) {
      this.descuento = 0;
      this.mostrarValorInputDescuento(0);
    }

    this.calcularTotal()
  }
  mostrarValorInputDescuento(valor: number) {
    this.formDescuento.setValue({
      descuento: valor,

    });
  }

  calcularTotal() {
    this.total = this.subtotal + this.ivaCalculado - this.descuento;
  }

  esEdictar() {
    if (this.id !== null) {
      this.titulo = 'Factura';

      this.btnDisabled = true;

      this._httpServices.getId<Factura>(this.id, 'facturas').subscribe(res => {


        if (res.data.id) {
          console.log(res, 'datos del id');

          this.mostrarValorInputDescuento(res.data.descuento);
          this.consecutivo = res.data.consecutivo;
          this.articulos = res.data.articulos;
          this.total = res.data.total;
          this.subtotal = res.data.subtotal;
          this.ivaCalculado = res.data.iva;
          this.UID = res.data.user_id

          this.getUsuario(res.data.user_id);
        }

      })

    } else {
      this.obtenerUltimoNfactura();
      this.validarSesion();
    }
  }

  buscarProducto(seach: any) {
    this.page = 0;
    this.busqueda = seach;

  }
  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  buscarCategoria(id: any) {

    this.page = 0;
    this.selected = id;


  }


  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

  }

  obtenerUltimoNfactura() {

    this._httpServices.get<Factura>('facturas').subscribe(res => {
      this.facturas = [];

      this.facturas = res.data;

      let n = this.facturas.length - 1;

      if (n < 0) {

        this.consecutivo = 1;
      } else {
        this.consecutivo = this.facturas[n].consecutivo + 1;


      }

    });



  }



}
