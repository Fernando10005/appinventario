package scandiani.inventarios.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import scandiani.inventarios.modelos.HistorialAsignacion;

import java.util.List;
import java.util.Optional;

public interface HistorialRepositorio extends JpaRepository<HistorialAsignacion, Integer> {

    List<HistorialAsignacion> findByActivo_IdActivo(Integer idActivo);

    List<HistorialAsignacion> findByEmpleado_IdEmpleado(Integer idEmpleado);

    // El registro activo (sin fecha devolución) para un activo
    Optional<HistorialAsignacion> findByActivo_IdActivoAndFechaDevolucionIsNull(Integer idActivo);

    List<HistorialAsignacion> findAllByOrderByFechaAsignacionDesc();
}
