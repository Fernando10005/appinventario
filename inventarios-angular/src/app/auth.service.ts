import { Injectable } from '@angular/core';

export interface AppUser {
  usuario: string;
  password: string;
  rol: 'admin' | 'user';
  nombre: string;
}

const STORAGE_KEY = 'app_users';
const SESSION_KEY = 'auth_user';

const DEFAULT_USERS: AppUser[] = [
  { usuario: 'admin', password: 'admin123', rol: 'admin', nombre: 'Administrador' },
  { usuario: 'user',  password: 'user123',  rol: 'user',  nombre: 'Usuario'        }
];

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loadUsers(): AppUser[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw) as AppUser[];
  }

  private saveUsers(users: AppUser[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  login(usuario: string, password: string): boolean {
    const user = this.loadUsers().find(u => u.usuario === usuario && u.password === password);
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ usuario: user.usuario, rol: user.rol, nombre: user.nombre }));
      return true;
    }
    return false;
  }

  logout(): void { localStorage.removeItem(SESSION_KEY); }
  isLoggedIn(): boolean { return !!localStorage.getItem(SESSION_KEY); }

  private getSession(): { usuario: string; rol: string; nombre: string } | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  getCurrentUser(): string { return this.getSession()?.usuario || ''; }
  getCurrentNombre(): string { return this.getSession()?.nombre || ''; }
  getRol(): 'admin' | 'user' { return (this.getSession()?.rol as any) || 'user'; }
  isAdmin(): boolean { return this.getRol() === 'admin'; }

  // ── Gestión de usuarios (solo admin) ─────────────────────────────────────
  getUsuarios(): AppUser[] { return this.loadUsers(); }

  agregarUsuario(user: AppUser): boolean {
    const users = this.loadUsers();
    if (users.some(u => u.usuario === user.usuario)) return false;
    users.push(user);
    this.saveUsers(users);
    return true;
  }

  editarUsuario(usuarioOriginal: string, datos: Partial<AppUser>): boolean {
    const users = this.loadUsers();
    const idx = users.findIndex(u => u.usuario === usuarioOriginal);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...datos };
    this.saveUsers(users);
    // Actualizar sesión si es el usuario actual
    if (this.getCurrentUser() === usuarioOriginal && datos.usuario) {
      const session = this.getSession()!;
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, ...datos }));
    }
    return true;
  }

  eliminarUsuario(usuario: string): boolean {
    if (usuario === this.getCurrentUser()) return false; // no autoeliminarse
    const users = this.loadUsers().filter(u => u.usuario !== usuario);
    this.saveUsers(users);
    return true;
  }

  cambiarPassword(usuario: string, passwordActual: string, nuevaPassword: string): boolean {
    const users = this.loadUsers();
    const user = users.find(u => u.usuario === usuario && u.password === passwordActual);
    if (!user) return false;
    user.password = nuevaPassword;
    this.saveUsers(users);
    return true;
  }
}
