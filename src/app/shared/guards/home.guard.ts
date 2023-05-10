
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class HomeGuard {

  constructor(
    private _authService: AuthService,
    private router: Router) { }

  canActivate() {

    return this._authService.obtenerDatosSesion().pipe(
      tap((islog) => islog ? this.router.navigate(['/home']) : true
      )
    );
  }

}