import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activo } from '../activo';
import { ActivoService } from '../activo.service';

@Component({ selector: 'app-editar-activo', templateUrl: './editar-activo.component.html' })
export class EditarActivoComponent implements OnInit {
  activo: Activo = new Activo();
  id: number;
  error = '';
  constructor(private svc: ActivoService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.svc.obtenerPorId(this.id).subscribe({ next: d => this.activo = d, error: () => this.router.navigate(['/activos']) });
  }
  onSubmit() {
    this.svc.editar(this.id, this.activo).subscribe({
      next: () => this.router.navigate(['/activos']),
      error: (e) => this.error = 'Error: ' + (e.error?.message || e.message)
    });
  }
}
