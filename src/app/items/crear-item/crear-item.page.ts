import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Producto } from 'src/app/models/producto.model';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-crear-item',
  templateUrl: './crear-item.page.html',
  styleUrls: ['./crear-item.page.scss'],
})
export class CrearItemPage implements OnInit {
  productos: Producto[] = []
  crearItem: FormGroup;
  submitted = false;
  loading = false;
  titulo = 'Crear Item';
  id: any;


  constructor(
    private _httpServices: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.crearItem = this.fb.group({
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      producto_id: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.esEdictar();
    this.getProductos();
  }

  agregarEdictarItem() {

    this.submitted = true;

    if (this.crearItem.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarItem();
    } else {
      this.edictarItem(this.id)
    }

  }

  edictarItem(id: string) {

    const item: Item = {
      precio: this.crearItem.value.precio,
      stock: this.crearItem.value.stock,
      producto_id: parseInt(this.crearItem.value.producto_id),
    }
    this.loading = true;
    this._httpServices.patch(this.id, item, 'items').subscribe(() => {
      this.loading = false;
      console.log('actualizacion exitosa');
      this.router.navigate(['/items']);


    }, (error => {
      console.log(error);

    }))


  }

  agregarItem() {
    const item: Item = {
      precio: this.crearItem.value.precio,
      stock: this.crearItem.value.stock,
      producto_id: parseInt(this.crearItem.value.producto_id),
    }


    console.log(item);


    this.loading = true;

    this._httpServices.post(item, 'items').subscribe(() => {

      console.log('Producto registrado');
      this.router.navigate(['/items']);


    }, (error => {
      console.log(error);

    }))

  }
  esEdictar() {


    if (this.id !== null) {
      this.titulo = 'Edictar Item';
      this._httpServices.getId<Item>(this.id,'items').subscribe(res => {

        console.log(res, 'datos del id');


        this.crearItem.setValue({
          precio: res.data.precio,
          stock: res.data.stock,
          producto_id: res.data.producto_id.toString(),

        })

      })

    }

  }

  getProductos() {
    this._httpServices.get<Producto>('productos').subscribe((res) => {
      this.productos = [];

      this.productos = res.data;
      console.log(this.productos, 'Productos');

    }, (error) => {
      console.log(error);

    })
  }


}
