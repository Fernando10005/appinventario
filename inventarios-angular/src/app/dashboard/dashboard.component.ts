import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../activo.service';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  total = 0; asignados = 0; disponibles = 0; numEmpleados = 0;
  porCategoria: { nombre: string; cantidad: number }[] = [];

  constructor(private activoSvc: ActivoService, private empSvc: EmpleadoService) {}

  ngOnInit() {
    this.activoSvc.estadisticas().subscribe((s: any) => {
      this.total = s.total; this.asignados = s.asignados; this.disponibles = s.disponibles;
      if (s.porCategoria) {
        this.porCategoria = Object.entries(s.porCategoria).map(([k,v]) => ({ nombre: k, cantidad: v as number }));
      }
    });
    this.empSvc.listar().subscribe(e => this.numEmpleados = e.length);
  }
  pct(v: number): string { return this.total > 0 ? ((v/this.total)*100).toFixed(0)+'%' : '0%'; }
}
