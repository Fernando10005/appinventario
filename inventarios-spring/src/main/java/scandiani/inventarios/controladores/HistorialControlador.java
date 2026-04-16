package scandiani.inventarios.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import scandiani.inventarios.modelos.HistorialAsignacion;
import scandiani.inventarios.servicios.IHistorialServicio;

import java.util.List;

@RestController
@RequestMapping("inventario-app")
@CrossOrigin(value = "http://localhost:4200")
public class HistorialControlador {

    @Autowired
    private IHistorialServicio historialServicio;

    // GET /historial
    @GetMapping("/historial")
    public List<HistorialAsignacion> listarHistorial() {
        return historialServicio.listarTodo();
    }

    // GET /historial/activo/{id}
    @GetMapping("/historial/activo/{id}")
    public List<HistorialAsignacion> historialPorActivo(@PathVariable int id) {
        return historialServicio.listarPorActivo(id);
    }

    // GET /historial/empleado/{id}
    @GetMapping("/historial/empleado/{id}")
    public List<HistorialAsignacion> historialPorEmpleado(@PathVariable int id) {
        return historialServicio.listarPorEmpleado(id);
    }
}
