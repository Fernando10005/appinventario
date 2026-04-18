import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from '../activo';
import { ActivoService } from '../activo.service';

@Component({ selector: 'app-agregar-activo', templateUrl: './agregar-activo.component.html' })
export class AgregarActivoComponent {
  activo: Activo = new Activo();
  error = '';
  constructor(private svc: ActivoService, private router: Router) {}
  onSubmit() {
    this.activo.estado = 'disponible';
    this.svc.crear(this.activo).subscribe({
      next: () => this.router.navigate(['/activos']),
      error: (e) => this.error = 'Error: ' + (e.error?.message || e.message)
    });
  }
}
