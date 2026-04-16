package scandiani.inventarios.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import scandiani.inventarios.modelos.HistorialAsignacion;
import scandiani.inventarios.repositorios.HistorialRepositorio;

import java.util.List;

@Service
public class HistorialServicio implements IHistorialServicio {

    @Autowired
    private HistorialRepositorio historialRepositorio;

    @Override
    public List<HistorialAsignacion> listarTodo() {
        return historialRepositorio.findAllByOrderByFechaAsignacionDesc();
    }

    @Override
    public List<HistorialAsignacion> listarPorActivo(Integer idActivo) {
        return historialRepositorio.findByActivo_IdActivo(idActivo);
    }

    @Override
    public List<HistorialAsignacion> listarPorEmpleado(Integer idEmpleado) {
        return historialRepositorio.findByEmpleado_IdEmpleado(idEmpleado);
    }
}
