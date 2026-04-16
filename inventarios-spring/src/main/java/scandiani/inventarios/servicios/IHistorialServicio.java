package scandiani.inventarios.servicios;

import scandiani.inventarios.modelos.HistorialAsignacion;

import java.util.List;

public interface IHistorialServicio {
    List<HistorialAsignacion> listarTodo();
    List<HistorialAsignacion> listarPorActivo(Integer idActivo);
    List<HistorialAsignacion> listarPorEmpleado(Integer idEmpleado);
}
