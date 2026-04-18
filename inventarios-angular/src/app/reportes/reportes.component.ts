import { Component, OnInit } from '@angular/core';
import { Activo } from '../activo';
import { Empleado } from '../empleado';
import { ActivoService } from '../activo.service';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-reportes', templateUrl: './reportes.component.html' })
export class ReportesComponent implements OnInit {
  todosActivos: Activo[] = [];
  empleados: Empleado[] = [];
  activosPorEmpleado: { empleado: Empleado; activos: Activo[] }[] = [];
  tabActiva = 'lista';

  constructor(private activoSvc: ActivoService, private empSvc: EmpleadoService) {}

  ngOnInit() {
    this.activoSvc.listar().subscribe(a => {
      this.todosActivos = a;
      this.construirReportePorEmpleado();
    });
    this.empSvc.listar().subscribe(e => {
      this.empleados = e;
      this.construirReportePorEmpleado();
    });
  }

  construirReportePorEmpleado() {
    if (!this.todosActivos.length || !this.empleados.length) return;
    this.activosPorEmpleado = this.empleados.map(emp => ({
      empleado: emp,
      activos: this.todosActivos.filter(a => a.empleado?.idEmpleado === emp.idEmpleado)
    })).filter(r => r.activos.length > 0);
  }

  imprimirTabla() { window.print(); }
}
