import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  usuario = ''; password = ''; error = '';
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/dashboard']);
  }
  onLogin() {
    if (this.auth.login(this.usuario, this.password)) this.router.navigate(['/dashboard']);
    else this.error = 'Usuario o contraseña incorrectos';
  }
}
