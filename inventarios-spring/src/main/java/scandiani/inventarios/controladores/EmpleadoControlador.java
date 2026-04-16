package scandiani.inventarios.controladores;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scandiani.inventarios.excepciones.RecursoNoEncontradoExcepcion;
import scandiani.inventarios.modelos.Empleado;
import scandiani.inventarios.servicios.IEmpleadoServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("inventario-app")
@CrossOrigin(value = "http://localhost:4200")
public class EmpleadoControlador {

    private static final Logger log = LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private IEmpleadoServicio empleadoServicio;

    // GET /empleados
    @GetMapping("/empleados")
    public List<Empleado> listarEmpleados() {
        List<Empleado> empleados = empleadoServicio.listarEmpleados();
        log.info("Empleados obtenidos: {}", empleados.size());
        return empleados;
    }

    // GET /empleados/buscar?nombre=
    @GetMapping("/empleados/buscar")
    public List<Empleado> buscarEmpleados(@RequestParam String nombre) {
        return empleadoServicio.buscarPorNombre(nombre);
    }

    // GET /empleados/{id}
    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerPorId(@PathVariable int id) {
        Empleado empleado = empleadoServicio.buscarPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id);
        return ResponseEntity.ok(empleado);
    }

    // POST /empleados
    @PostMapping("/empleados")
    public ResponseEntity<Empleado> crearEmpleado(@RequestBody Empleado empleado) {
        log.info("Crear empleado: {}", empleado);
        Empleado nuevo = empleadoServicio.guardarEmpleado(empleado);
        return ResponseEntity.ok(nuevo);
    }

    // PUT /empleados/{id}
    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable int id,
                                                        @RequestBody Empleado datos) {
        Empleado empleado = empleadoServicio.buscarPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id);
        empleado.setNombre(datos.getNombre());
        empleado.setApellido(datos.getApellido());
        empleado.setEmail(datos.getEmail());
        empleado.setDepartamento(datos.getDepartamento());
        empleado.setPuesto(datos.getPuesto());
        empleadoServicio.guardarEmpleado(empleado);
        return ResponseEntity.ok(empleado);
    }

    // DELETE /empleados/{id}
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarEmpleado(@PathVariable int id) {
        Empleado empleado = empleadoServicio.buscarPorId(id);
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id);
        empleadoServicio.eliminarEmpleado(id);
        Map<String, Boolean> resp = new HashMap<>();
        resp.put("eliminado", true);
        return ResponseEntity.ok(resp);
    }
}
