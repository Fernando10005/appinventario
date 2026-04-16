import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-agregar-empleado', templateUrl: './agregar-empleado.component.html' })
export class AgregarEmpleadoComponent {
  empleado: Empleado = new Empleado();
  error = '';
  constructor(private svc: EmpleadoService, private router: Router) {}
  onSubmit() {
    this.svc.crear(this.empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (e) => this.error = 'Error: ' + (e.error?.message || e.message)
    });
  }
}
