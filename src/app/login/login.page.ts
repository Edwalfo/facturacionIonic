import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isCredenciales: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  login() {

    const credenciales: any = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };


    this._authService.login(credenciales).subscribe(res => {

      const token= res.data.token;

      if (token) {
        this._authService.almacenarUsuarioValido(token);
        this._authService.ActualizarComportamientoUsuario(token);
        this.router.navigate(['/home']);

      } else {
        this.isCredenciales = true;
      }
    })


  }




}
