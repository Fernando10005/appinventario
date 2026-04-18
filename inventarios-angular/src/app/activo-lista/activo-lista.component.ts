import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from '../activo';
import { ActivoService } from '../activo.service';

@Component({ selector: 'app-activo-lista', templateUrl: './activo-lista.component.html' })
export class ActivoListaComponent implements OnInit {
  activos: Activo[] = [];
  filtroBusqueda = '';
  filtroEstado = '';

  constructor(private svc: ActivoService, private router: Router) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.svc.listar(this.filtroEstado || undefined, this.filtroBusqueda.trim() || undefined)
      .subscribe(d => this.activos = d);
  }

  editar(id: number) { this.router.navigate(['/activos/editar', id]); }

  eliminar(id: number) {
    if (confirm('¿Eliminar este activo?'))
      this.svc.eliminar(id).subscribe(() => this.cargar());
  }

  devolver(id: number) {
    if (confirm('¿Devolver este activo?'))
      this.svc.devolver(id).subscribe(() => this.cargar());
  }

  limpiarFiltros() { this.filtroBusqueda = ''; this.filtroEstado = ''; this.cargar(); }
}
