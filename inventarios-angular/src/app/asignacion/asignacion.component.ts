import { Component, OnInit } from '@angular/core';
import { Activo } from '../activo';
import { Empleado } from '../empleado';
import { ActivoService } from '../activo.service';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-asignacion', templateUrl: './asignacion.component.html' })
export class AsignacionComponent implements OnInit {
  activosDisponibles: Activo[] = [];
  activosAsignados: Activo[] = [];
  empleados: Empleado[] = [];

idActivoSeleccionado: number | null = null;
idEmpleadoSeleccionado: number | null = null;

  mensaje = '';
  error = '';

  constructor(private activoSvc: ActivoService, private empSvc: EmpleadoService) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.activoSvc.listar('disponible').subscribe(d => this.activosDisponibles = d);
    this.activoSvc.listar('asignado').subscribe(d => this.activosAsignados = d);
    this.empSvc.listar().subscribe(d => this.empleados = d);
  }

  asignar() {
    if (!this.idActivoSeleccionado || !this.idEmpleadoSeleccionado) {
      this.error = 'Selecciona un activo y un empleado'; return;
    }
    this.activoSvc.asignar(this.idActivoSeleccionado, this.idEmpleadoSeleccionado).subscribe({
      next: () => {
        this.mensaje = 'Activo asignado exitosamente'; this.error = '';
        this.idActivoSeleccionado = null; this.idEmpleadoSeleccionado = null;
        this.cargar();
      },
      error: (e) => { this.error = 'Error: ' + (e.error?.message || e.message); this.mensaje = ''; }
    });
  }

  devolver(idActivo: number) {
    if (confirm('¿Confirmar devolución de este activo?')) {
      this.activoSvc.devolver(idActivo).subscribe({
        next: () => { this.mensaje = 'Activo devuelto exitosamente'; this.cargar(); },
        error: (e) => this.error = 'Error: ' + (e.error?.message || e.message)
      });
    }
  }

  nombreEmpleado(id: number): string {
    const e = this.empleados.find(emp => emp.idEmpleado === id);
    return e ? `${e.nombre} ${e.apellido}` : '—';
  }
}
