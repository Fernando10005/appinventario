import { Component, OnInit } from '@angular/core';
import { AuthService, AppUser } from '../auth.service';

@Component({ selector: 'app-admin-panel', templateUrl: './admin-panel.component.html' })
export class AdminPanelComponent implements OnInit {
  usuarios: AppUser[] = [];
  vista: 'usuarios' | 'nuevo' | 'editar' | 'password' = 'usuarios';

  // Formulario nuevo/editar
  form: AppUser = { usuario: '', password: '', rol: 'user', nombre: '' };
  usuarioEditando = '';
  errorForm = '';
  okForm = '';

  // Cambio de contraseña
  pwActual = ''; pwNueva = ''; pwConfirm = '';
  errorPw = ''; okPw = '';

  constructor(public auth: AuthService) {}

  ngOnInit() { this.cargar(); }

  cargar() { this.usuarios = this.auth.getUsuarios(); }

  // ── Nuevo usuario ────────────────────────────────────────────────────────
  abrirNuevo() {
    this.form = { usuario: '', password: '', rol: 'user', nombre: '' };
    this.errorForm = ''; this.okForm = ''; this.vista = 'nuevo';
  }

  guardarNuevo() {
    if (!this.form.usuario || !this.form.password || !this.form.nombre) {
      this.errorForm = 'Todos los campos son obligatorios.'; return;
    }
    if (!this.auth.agregarUsuario(this.form)) {
      this.errorForm = 'El usuario ya existe.'; return;
    }
    this.okForm = 'Usuario creado correctamente.';
    this.cargar();
    setTimeout(() => this.vista = 'usuarios', 1200);
  }

  // ── Editar usuario ───────────────────────────────────────────────────────
  abrirEditar(u: AppUser) {
    this.usuarioEditando = u.usuario;
    this.form = { ...u, password: '' }; // no precargar contraseña
    this.errorForm = ''; this.okForm = ''; this.vista = 'editar';
  }

  guardarEditar() {
    if (!this.form.nombre) { this.errorForm = 'El nombre es obligatorio.'; return; }
    const datos: Partial<AppUser> = { nombre: this.form.nombre, rol: this.form.rol };
    if (this.form.password) datos['password'] = this.form.password;
    this.auth.editarUsuario(this.usuarioEditando, datos);
    this.okForm = 'Usuario actualizado.';
    this.cargar();
    setTimeout(() => this.vista = 'usuarios', 1200);
  }

  eliminar(usuario: string) {
    if (usuario === 'admin') { alert('No se puede eliminar el usuario admin.'); return; }
    if (confirm(`¿Eliminar al usuario "${usuario}"?`)) {
      this.auth.eliminarUsuario(usuario);
      this.cargar();
    }
  }

  // ── Cambiar contraseña propia ────────────────────────────────────────────
  abrirPassword() {
    this.pwActual = ''; this.pwNueva = ''; this.pwConfirm = '';
    this.errorPw = ''; this.okPw = ''; this.vista = 'password';
  }

  guardarPassword() {
    if (!this.pwActual || !this.pwNueva || !this.pwConfirm) {
      this.errorPw = 'Completa todos los campos.'; return;
    }
    if (this.pwNueva !== this.pwConfirm) {
      this.errorPw = 'Las contraseñas nuevas no coinciden.'; return;
    }
    if (this.pwNueva.length < 6) {
      this.errorPw = 'La contraseña debe tener al menos 6 caracteres.'; return;
    }
    if (!this.auth.cambiarPassword(this.auth.getCurrentUser(), this.pwActual, this.pwNueva)) {
      this.errorPw = 'Contraseña actual incorrecta.'; return;
    }
    this.okPw = 'Contraseña cambiada correctamente.';
    setTimeout(() => this.vista = 'usuarios', 1500);
  }

  cancelar() { this.errorForm = ''; this.okForm = ''; this.vista = 'usuarios'; }
}
