import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LB4: any;


  constructor() {
    this.LB4 = {
      url: environment.apiUrl,
      headers: { "content-type": "application/json" }
    };

    this.validacionDeSesion();

  }

  datosUsuarioValidado = new BehaviorSubject<string>("");

  login(credenciales: any): Observable<HttpResponse> {

    const options = {
      url: this.LB4.url + '/users/login',
      headers: this.LB4.headers,
      data: credenciales,

    };


    const response = from(CapacitorHttp.post(options));
    return response;

  }

  currentUser(token: string): Observable<HttpResponse> {


    const options = {
      url: this.LB4.url + '/whoAmI',
      headers: {
        'Authorization': 'Bearer ' + token
      },

    };

    const response = from(CapacitorHttp.get(options));
    return response;
  }


  almacenarUsuarioValido(token: string): void {

    Preferences.set({
      key: 'token',
      value: token,
    });

  }



  obtenerDatosSesion(): Observable<string> {
    return this.datosUsuarioValidado.asObservable();
  }

  validacionDeSesion() {
    let Ls = Preferences.get({ key: 'token' });

    Ls.then(res => {
      if (res.value) {
        let tk = res.value

        this.ActualizarComportamientoUsuario(tk);
      }
    })

  }




  ActualizarComportamientoUsuario(datos: string) {

    return this.datosUsuarioValidado.next(datos);
  }

  cerrarSesion(): Promise<void> {
    this.ActualizarComportamientoUsuario("");
    return Preferences.remove({ key: 'token' });
  }



}
