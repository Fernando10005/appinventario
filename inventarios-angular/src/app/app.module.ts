import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pipes
import { FilterEstadoPipe } from './pipes/filter-estado.pipe';

// Login / Dashboard
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Productos (originales)
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

// Empleados
import { EmpleadoListaComponent } from './empleado-lista/empleado-lista.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';

// Activos
import { ActivoListaComponent } from './activo-lista/activo-lista.component';
import { AgregarActivoComponent } from './agregar-activo/agregar-activo.component';
import { EditarActivoComponent } from './editar-activo/editar-activo.component';

// Asignación / Historial / Reportes
import { AsignacionComponent } from './asignacion/asignacion.component';
import { HistorialComponent } from './historial/historial.component';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterEstadoPipe,
    LoginComponent,
    DashboardComponent,
    ProductoListaComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    EmpleadoListaComponent,
    AgregarEmpleadoComponent,
    EditarEmpleadoComponent,
    ActivoListaComponent,
    AgregarActivoComponent,
    EditarActivoComponent,
    AsignacionComponent,
    HistorialComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
