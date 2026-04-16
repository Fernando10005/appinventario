package scandiani.inventarios.servicios;

import scandiani.inventarios.modelos.Activo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IActivoServicio {
    List<Activo> listarActivos();
    Activo buscarPorId(Integer id);
    Optional<Activo> buscarPorNumeroSerie(String numeroSerie);
    List<Activo> buscarPorNumeroSerieContiene(String serie);
    List<Activo> listarPorEstado(String estado);
    Activo guardarActivo(Activo activo);
    void eliminarActivo(Integer id);
    void asignarActivo(Integer idActivo, Integer idEmpleado);
    void devolverActivo(Integer idActivo);
    Map<String, Object> obtenerEstadisticas();
    List<Activo> listarActivosPorEmpleado(Integer idEmpleado);
}
