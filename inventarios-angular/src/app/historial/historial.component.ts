import { Component, OnInit } from '@angular/core';
import { HistorialAsignacion } from '../historial-asignacion';
import { ActivoService } from '../activo.service';

@Component({ selector: 'app-historial', templateUrl: './historial.component.html' })
export class HistorialComponent implements OnInit {
  historial: HistorialAsignacion[] = [];
  cargando = true;

  constructor(private svc: ActivoService) {}

  ngOnInit() {
    this.svc.historial().subscribe(d => { this.historial = d; this.cargando = false; });
  }
}
