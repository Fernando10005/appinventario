import { Pipe, PipeTransform } from '@angular/core';
import { Activo } from '../activo';

@Pipe({ name: 'filterEstado' })
export class FilterEstadoPipe implements PipeTransform {
  transform(activos: Activo[], estado: string): number {
    if (!activos) return 0;
    return activos.filter(a => a.estado === estado).length;
  }
}
