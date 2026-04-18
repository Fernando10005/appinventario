import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({ selector: 'app-empleado-lista', templateUrl: './empleado-lista.component.html' })
export class EmpleadoListaComponent implements OnInit {
  empleados: Empleado[] = [];
  busqueda = '';
  constructor(private svc: EmpleadoService, private router: Router) {}
  ngOnInit() { this.cargar(); }
  cargar() { this.svc.listar().subscribe(d => this.empleados = d); }
  buscar() {
    if (this.busqueda.trim()) this.svc.buscar(this.busqueda).subscribe(d => this.empleados = d);
    else this.cargar();
  }
  editar(id: number) { this.router.navigate(['/empleados/editar', id]); }
  eliminar(id: number) {
    if (confirm('¿Eliminar este empleado?'))
      this.svc.eliminar(id).subscribe(() => this.cargar());
  }
}
