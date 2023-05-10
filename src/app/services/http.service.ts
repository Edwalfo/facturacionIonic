import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from } from 'rxjs/internal/observable/from';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _refresh$ = new Subject<void>();
  private LB4: any;

  constructor() {
    this.LB4 ={
      url:environment.apiUrl,
      headers:{ "content-type": "application/json" }
    } ;

  }

  get refresh$() {
    return this._refresh$;
  }

  //Obtener todos los registros
  get<tipo>(ruta: string): Observable<HttpResponse> {

    const options = {
      url: this.LB4.url+ ruta,

    };

    return from(CapacitorHttp.get(options));
  }
  //Obtener un registro con ID
  getId<tipo>(id: any, ruta: string): Observable<HttpResponse> {

    const options = {
      url: this.LB4.url + ruta + '/' + id,

    };

    return from(CapacitorHttp.get(options));
  }
  //Crear nuevo registro
  post(datos: any, ruta: string): Observable<HttpResponse> {


    const options = {
      url: this.LB4.url + ruta,
      headers: this.LB4.headers,
      data: datos,

    };

    ;
    return from(CapacitorHttp.post(options))
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  //Eliminar un registro
  delete(id: number, ruta: string): Observable<HttpResponse> {

    const options = {
      url: this.LB4.url+ ruta + '/' + id,


    };

    return from(CapacitorHttp.delete(options))
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  //Actualizar un registro
  patch(id: number, datos: any, ruta: string): Observable<HttpResponse> {

    const options = {
      url: this.LB4.url + ruta + '/' + id,
      headers: this.LB4.headers,
      data: datos,


    };

    return from(CapacitorHttp.patch(options))
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
