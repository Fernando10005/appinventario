import { Empleado } from './empleado';

export class Activo {
  idActivo: number;
  nombre: string;
  descripcion: string;
  numeroSerie: string;
  categoria: string;
  estado: string; // 'disponible' | 'asignado'
  empleado?: Empleado;
}
