import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: Categoria[] = [];

  subscription: Subscription | undefined;

  constructor(
    private _httpServices: HttpService
  ) {

  }

  ngOnInit() {
    this.getCategorias();
    this.subscription = this._httpServices.refresh$.subscribe(()=>{
      this.getCategorias();
    })

  }

  getCategorias() {
    this._httpServices.get<Categoria>('categorias').subscribe(res => {
      this.categorias=[];
      console.log(res.data);
      this.categorias = res.data;


    })
  }

  eliminarCategoria(id: any) {
    this._httpServices.delete(id,'categorias').subscribe(() => {

      console.log('Categoria eliminada');

    }, (err) => {
      console.log(err);

    })

  }

}
