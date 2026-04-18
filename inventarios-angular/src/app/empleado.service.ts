import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
 private base = `${environment.apiUrl}/empleados`;
  

  constructor(private http: HttpClient) {}

  listar(): Observable<Empleado[]> { return this.http.get<Empleado[]>(this.base); }
  buscar(nombre: string): Observable<Empleado[]> { return this.http.get<Empleado[]>(`${this.base}/buscar?nombre=${nombre}`); }
  obtenerPorId(id: number): Observable<Empleado> { return this.http.get<Empleado>(`${this.base}/${id}`); }
  crear(e: Empleado): Observable<Empleado> { return this.http.post<Empleado>(this.base, e); }
  editar(id: number, e: Empleado): Observable<Empleado> { return this.http.put<Empleado>(`${this.base}/${id}`, e); }
  eliminar(id: number): Observable<any> { return this.http.delete(`${this.base}/${id}`); }
}
