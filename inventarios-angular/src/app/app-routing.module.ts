import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

import { EmpleadoListaComponent } from './empleado-lista/empleado-lista.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';

import { ActivoListaComponent } from './activo-lista/activo-lista.component';
import { AgregarActivoComponent } from './agregar-activo/agregar-activo.component';
import { EditarActivoComponent } from './editar-activo/editar-activo.component';

import { AsignacionComponent } from './asignacion/asignacion.component';
import { HistorialComponent } from './historial/historial.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'dashboard',          component: DashboardComponent,       canActivate: [AuthGuard] },

  // Productos (originales)
  { path: 'productos',          component: ProductoListaComponent,   canActivate: [AuthGuard] },
  { path: 'agregar-producto',   component: AgregarProductoComponent, canActivate: [AuthGuard] },
  { path: 'editar-producto/:id',component: EditarProductoComponent,  canActivate: [AuthGuard] },

  // Empleados
  { path: 'empleados',              component: EmpleadoListaComponent,   canActivate: [AuthGuard] },
  { path: 'empleados/agregar',      component: AgregarEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'empleados/editar/:id',   component: EditarEmpleadoComponent,  canActivate: [AuthGuard] },

  // Activos
  { path: 'activos',            component: ActivoListaComponent,   canActivate: [AuthGuard] },
  { path: 'activos/agregar',    component: AgregarActivoComponent, canActivate: [AuthGuard] },
  { path: 'activos/editar/:id', component: EditarActivoComponent,  canActivate: [AuthGuard] },

  // Asignación, Historial, Reportes
  { path: 'asignacion', component: AsignacionComponent, canActivate: [AuthGuard] },
  { path: 'historial',  component: HistorialComponent,  canActivate: [AuthGuard] },
  { path: 'reportes',   component: ReportesComponent,   canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
