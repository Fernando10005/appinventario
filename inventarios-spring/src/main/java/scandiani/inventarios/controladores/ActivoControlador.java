package scandiani.inventarios.controladores;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scandiani.inventarios.excepciones.RecursoNoEncontradoExcepcion;
import scandiani.inventarios.modelos.Activo;
import scandiani.inventarios.servicios.IActivoServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("inventario-app")
@CrossOrigin(value = "http://localhost:4200")
public class ActivoControlador {

    private static final Logger log = LoggerFactory.getLogger(ActivoControlador.class);

    @Autowired
    private IActivoServicio activoServicio;

    // GET /activos
    @GetMapping("/activos")
    public List<Activo> listarActivos(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String serie) {
        if (serie != null && !serie.isBlank()) {
            return activoServicio.buscarPorNumeroSerieContiene(serie);
        }
        if (estado != null && !estado.isBlank()) {
            return activoServicio.listarPorEstado(estado);
        }
        return activoServicio.listarActivos();
    }

    // GET /activos/{id}
    @GetMapping("/activos/{id}")
    public ResponseEntity<Activo> obtenerPorId(@PathVariable int id) {
        Activo activo = activoServicio.buscarPorId(id);
        if (activo == null)
            throw new RecursoNoEncontradoExcepcion("Activo no encontrado con id: " + id);
        return ResponseEntity.ok(activo);
    }

    // GET /activos/empleado/{idEmpleado}
    @GetMapping("/activos/empleado/{idEmpleado}")
    public List<Activo> activosPorEmpleado(@PathVariable int idEmpleado) {
        return activoServicio.listarActivosPorEmpleado(idEmpleado);
    }

    // POST /activos
    @PostMapping("/activos")
    public ResponseEntity<Activo> crearActivo(@RequestBody Activo activo) {
        log.info("Crear activo: {}", activo);
        Activo nuevo = activoServicio.guardarActivo(activo);
        return ResponseEntity.ok(nuevo);
    }

    // PUT /activos/{id}
    @PutMapping("/activos/{id}")
    public ResponseEntity<Activo> actualizarActivo(@PathVariable int id,
                                                    @RequestBody Activo datos) {
        Activo activo = activoServicio.buscarPorId(id);
        if (activo == null)
            throw new RecursoNoEncontradoExcepcion("Activo no encontrado con id: " + id);
        activo.setNombre(datos.getNombre());
        activo.setDescripcion(datos.getDescripcion());
        activo.setNumeroSerie(datos.getNumeroSerie());
        activo.setCategoria(datos.getCategoria());
        activoServicio.guardarActivo(activo);
        return ResponseEntity.ok(activo);
    }

    // DELETE /activos/{id}
    @DeleteMapping("/activos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarActivo(@PathVariable int id) {
        Activo activo = activoServicio.buscarPorId(id);
        if (activo == null)
            throw new RecursoNoEncontradoExcepcion("Activo no encontrado con id: " + id);
        activoServicio.eliminarActivo(id);
        Map<String, Boolean> resp = new HashMap<>();
        resp.put("eliminado", true);
        return ResponseEntity.ok(resp);
    }

    // PUT /activos/{id}/asignar?idEmpleado=
    @PutMapping("/activos/{id}/asignar")
    public ResponseEntity<Map<String, String>> asignarActivo(@PathVariable int id,
                                                              @RequestParam int idEmpleado) {
        activoServicio.asignarActivo(id, idEmpleado);
        Map<String, String> resp = new HashMap<>();
        resp.put("mensaje", "Activo asignado correctamente");
        return ResponseEntity.ok(resp);
    }

    // PUT /activos/{id}/devolver
    @PutMapping("/activos/{id}/devolver")
    public ResponseEntity<Map<String, String>> devolverActivo(@PathVariable int id) {
        activoServicio.devolverActivo(id);
        Map<String, String> resp = new HashMap<>();
        resp.put("mensaje", "Activo devuelto correctamente");
        return ResponseEntity.ok(resp);
    }

    // GET /activos/estadisticas
    @GetMapping("/activos/estadisticas")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        return ResponseEntity.ok(activoServicio.obtenerEstadisticas());
    }
}
