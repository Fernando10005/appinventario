import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activo } from './activo';
import { HistorialAsignacion } from './historial-asignacion';

@Injectable({ providedIn: 'root' })
export class ActivoService {
  private base = 'https://inventarioapp-production-6dd6.up.railway.app/inventario-app/activos';
  private histBase = 'https://inventarioapp-production-6dd6.up.railway.app/inventario-app/historial';

  constructor(private http: HttpClient) {}

  listar(estado?: string, serie?: string): Observable<Activo[]> {
    let params = new HttpParams();
    if (estado) params = params.set('estado', estado);
    if (serie)  params = params.set('serie', serie);
    return this.http.get<Activo[]>(this.base, { params });
  }

  obtenerPorId(id: number): Observable<Activo> { return this.http.get<Activo>(`${this.base}/${id}`); }
  crear(a: Activo): Observable<Activo> { return this.http.post<Activo>(this.base, a); }
  editar(id: number, a: Activo): Observable<Activo> { return this.http.put<Activo>(`${this.base}/${id}`, a); }
  eliminar(id: number): Observable<any> { return this.http.delete(`${this.base}/${id}`); }
  asignar(idActivo: number, idEmpleado: number): Observable<any> {
    return this.http.put(`${this.base}/${idActivo}/asignar?idEmpleado=${idEmpleado}`, {});
  }
  devolver(idActivo: number): Observable<any> { return this.http.put(`${this.base}/${idActivo}/devolver`, {}); }
  estadisticas(): Observable<any> { return this.http.get<any>(`${this.base}/estadisticas`); }
  activosPorEmpleado(idEmpleado: number): Observable<Activo[]> {
    return this.http.get<Activo[]>(`${this.base}/empleado/${idEmpleado}`);
  }

  // Historial
  historial(): Observable<HistorialAsignacion[]> { return this.http.get<HistorialAsignacion[]>(this.histBase); }
  historialPorActivo(id: number): Observable<HistorialAsignacion[]> { return this.http.get<HistorialAsignacion[]>(`${this.histBase}/activo/${id}`); }
  historialPorEmpleado(id: number): Observable<HistorialAsignacion[]> { return this.http.get<HistorialAsignacion[]>(`${this.histBase}/empleado/${id}`); }
}
