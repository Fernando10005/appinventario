import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS = [
    { usuario: 'admin', password: 'admin123' },
    { usuario: 'user',  password: 'user123'  }
  ];

  login(usuario: string, password: string): boolean {
    const ok = this.USERS.some(u => u.usuario === usuario && u.password === password);
    if (ok) localStorage.setItem('auth_user', usuario);
    return ok;
  }

  logout(): void { localStorage.removeItem('auth_user'); }
  isLoggedIn(): boolean { return !!localStorage.getItem('auth_user'); }
  getCurrentUser(): string { return localStorage.getItem('auth_user') || ''; }
}
