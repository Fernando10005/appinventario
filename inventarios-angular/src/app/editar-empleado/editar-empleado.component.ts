import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-editar-empleado', templateUrl: './editar-empleado.component.html' })
export class EditarEmpleadoComponent implements OnInit {
  empleado: Empleado = new Empleado();
  id: number;
  error = '';
  constructor(private svc: EmpleadoService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.svc.obtenerPorId(this.id).subscribe({ next: d => this.empleado = d, error: () => this.router.navigate(['/empleados']) });
  }
  onSubmit() {
    this.svc.editar(this.id, this.empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (e) => this.error = 'Error: ' + (e.error?.message || e.message)
    });
  }
}
