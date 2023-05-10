import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/producto.model';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.page.html',
  styleUrls: ['./crear-productos.page.scss'],
})
export class CrearProductosPage implements OnInit {

  categorias: Categoria[] = [];
  crearProducto: FormGroup;
  submitted = false;
  loading = false;
  titulo = 'Crear Producto';
  id: any;

  constructor(
    private _httpServices: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.crearProducto = this.fb.group({
      nombre: ['', Validators.required],
      detalle: [''],
      categoria_id: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.esEdictar();
    this.getCategorias();
  }

  agregarEdictarProducto() {

    this.submitted = true;

    if (this.crearProducto.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.edictarProducto(this.id)
    }

  }

  edictarProducto(id: string) {

    const producto: Producto = {
      nombre: this.crearProducto.value.nombre,
      detalle: this.crearProducto.value.detalle,
      categoria_id: parseInt(this.crearProducto.value.categoria_id),
    }
    this.loading = true;
    this._httpServices.patch(this.id, producto, 'productos').subscribe(() => {
      this.loading = false;
      console.log('actualizacion exitosa');
      this.router.navigate(['/productos']);

    }, (error => {
      console.log(error);

    }))


  }

  agregarProducto() {
    const producto: Producto = {
      nombre: this.crearProducto.value.nombre,
      detalle: this.crearProducto.value.detalle,
      categoria_id: parseInt(this.crearProducto.value.categoria_id),
    }


    console.log(producto);


    this.loading = true;

    this._httpServices.post(producto, 'productos').subscribe(() => {

      console.log('Producto registrado');
      this.router.navigate(['/productos']);


    }, (error => {
      console.log(error);


    }))

  }

  esEdictar() {


    if (this.id !== null) {
      this.titulo = 'Edictar Producto';
      this._httpServices.getId<Producto>(this.id,'productos').subscribe(res => {

        console.log(res, 'datos del id');


        this.crearProducto.setValue({
          nombre: res.data.nombre,
          detalle: res.data.detalle,
          categoria_id: res.data.categoria_id.toString(),

        })

      })

    }

  }


  getCategorias() {
    this._httpServices.get<Categoria>('categorias').subscribe(res => {
      this.categorias=[];
      console.log(res);
      this.categorias = res.data;
    })
  }


}
