import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { HttpService } from 'src/app/services/http.service';



@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.page.html',
  styleUrls: ['./crear-categoria.page.scss'],
})
export class CrearCategoriaPage implements OnInit {

  categorias: Categoria[] = []
  crearCategoria: FormGroup;
  submitted = false;
  loading = false;
  titulo = 'Crear Categoria';
  id: any;

  constructor(
    private _httpServices: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute

  ) {
    this.crearCategoria = this.fb.group({
      nombre: ['', Validators.required],

    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    

  }

  ngOnInit() {
    this.esEdictar();
  }

  agregarEdictarCategoria() {

    this.submitted = true;

    if (this.crearCategoria.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarCategoria();
    } else {
      this.edictarCategoria(this.id)
    }

  }

  edictarCategoria(id: string) {

    const categoria: Categoria = {
      nombre: this.crearCategoria.value.nombre,

    }
    this.loading = true;
    this._httpServices.patch(this.id,categoria,'categorias').subscribe(() => {
      this.loading = false;
      console.log('actualizacion exitosa');
      this.router.navigate(['/categorias']);

    },(error => {
      console.log(error);

    })
    )
   


  }

  agregarCategoria() {
    const categoria: Categoria = {
      nombre: this.crearCategoria.value.nombre,

    }

    
    this.loading = true;

    this._httpServices.post(categoria,'categorias').subscribe(() => {
      
      console.log('Categoria registrada');
      this.router.navigate(['/categorias']);

    },(error => {
      console.log(error);
      
    }))

  }

  esEdictar() {

    
    if (this.id !== null) {
      this.titulo = 'Edictar Categoria';
      this._httpServices.getId(this.id,'categorias').subscribe(res => {

        console.log(res.data,'datos del id');
        
        this.crearCategoria.setValue({
          nombre: res.data.nombre,

        })

      })

    }

  }

}
