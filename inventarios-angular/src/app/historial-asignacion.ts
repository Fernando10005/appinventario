import { Activo } from './activo';
import { Empleado } from './empleado';

export class HistorialAsignacion {
  idHistorial: number;
  activo: Activo;
  empleado: Empleado;
  fechaAsignacion: string;
  fechaDevolucion?: string;
}
