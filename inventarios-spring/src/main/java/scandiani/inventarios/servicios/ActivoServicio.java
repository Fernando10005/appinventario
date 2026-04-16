package scandiani.inventarios.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import scandiani.inventarios.excepciones.RecursoNoEncontradoExcepcion;
import scandiani.inventarios.modelos.Activo;
import scandiani.inventarios.modelos.Empleado;
import scandiani.inventarios.modelos.HistorialAsignacion;
import scandiani.inventarios.repositorios.ActivoRepositorio;
import scandiani.inventarios.repositorios.EmpleadoRepositorio;
import scandiani.inventarios.repositorios.HistorialRepositorio;

import java.time.LocalDate;
import java.util.*;

@Service
public class ActivoServicio implements IActivoServicio {

    @Autowired
    private ActivoRepositorio activoRepositorio;

    @Autowired
    private EmpleadoRepositorio empleadoRepositorio;

    @Autowired
    private HistorialRepositorio historialRepositorio;

    @Override
    public List<Activo> listarActivos() {
        return activoRepositorio.findAll();
    }

    @Override
    public Activo buscarPorId(Integer id) {
        return activoRepositorio.findById(id).orElse(null);
    }

    @Override
    public Optional<Activo> buscarPorNumeroSerie(String numeroSerie) {
        return activoRepositorio.findByNumeroSerie(numeroSerie);
    }

    @Override
    public List<Activo> buscarPorNumeroSerieContiene(String serie) {
        return activoRepositorio.findByNumeroSerieContainingIgnoreCase(serie);
    }

    @Override
    public List<Activo> listarPorEstado(String estado) {
        return activoRepositorio.findByEstado(estado);
    }

    @Override
    public Activo guardarActivo(Activo activo) {
        if (activo.getEstado() == null || activo.getEstado().isEmpty()) {
            activo.setEstado("disponible");
        }
        return activoRepositorio.save(activo);
    }

    @Override
    public void eliminarActivo(Integer id) {
        activoRepositorio.deleteById(id);
    }

    @Override
    public void asignarActivo(Integer idActivo, Integer idEmpleado) {
        Activo activo = activoRepositorio.findById(idActivo)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Activo no encontrado: " + idActivo));

        Empleado empleado = empleadoRepositorio.findById(idEmpleado)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado: " + idEmpleado));

        activo.setEstado("asignado");
        activo.setEmpleado(empleado);
        activoRepositorio.save(activo);

        // Registrar en historial
        HistorialAsignacion historial = new HistorialAsignacion();
        historial.setActivo(activo);
        historial.setEmpleado(empleado);
        historial.setFechaAsignacion(LocalDate.now());
        historial.setFechaDevolucion(null);
        historialRepositorio.save(historial);
    }

    @Override
    public void devolverActivo(Integer idActivo) {
        Activo activo = activoRepositorio.findById(idActivo)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Activo no encontrado: " + idActivo));

        // Actualizar historial abierto
        Optional<HistorialAsignacion> historialOpt =
                historialRepositorio.findByActivo_IdActivoAndFechaDevolucionIsNull(idActivo);
        historialOpt.ifPresent(h -> {
            h.setFechaDevolucion(LocalDate.now());
            historialRepositorio.save(h);
        });

        activo.setEstado("disponible");
        activo.setEmpleado(null);
        activoRepositorio.save(activo);
    }

    @Override
    public Map<String, Object> obtenerEstadisticas() {
        long total = activoRepositorio.count();
        long asignados = activoRepositorio.countByEstado("asignado");
        long disponibles = activoRepositorio.countByEstado("disponible");

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("asignados", asignados);
        stats.put("disponibles", disponibles);

        // Por categoria
        List<Object[]> porCategoria = activoRepositorio.countByCategoria();
        Map<String, Long> categorias = new LinkedHashMap<>();
        for (Object[] row : porCategoria) {
            categorias.put((String) row[0], (Long) row[1]);
        }
        stats.put("porCategoria", categorias);

        return stats;
    }

    @Override
    public List<Activo> listarActivosPorEmpleado(Integer idEmpleado) {
        return activoRepositorio.findByEmpleado_IdEmpleado(idEmpleado);
    }
}
