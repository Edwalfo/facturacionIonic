import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuario } from '../models/usuario.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  crearUsuario: FormGroup;

  constructor(
    private _httpServices: HttpService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.crearUsuario = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
  }


  agregarUsuario() {


    const usuario: usuario = {
      realm: this.crearUsuario.value.nombre,
      username: this.crearUsuario.value.username,
      email: this.crearUsuario.value.email,
      password: this.crearUsuario.value.password,
    }


    this._httpServices.post(usuario, 'signup').subscribe(() => {

      this.router.navigate(['/login']);

    }, (error => {
      console.log(error);

    }))



  }

}
