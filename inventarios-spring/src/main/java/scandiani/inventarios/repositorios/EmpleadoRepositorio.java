package scandiani.inventarios.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import scandiani.inventarios.modelos.Empleado;

import java.util.List;

public interface EmpleadoRepositorio extends JpaRepository<Empleado, Integer> {
    List<Empleado> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);
}
