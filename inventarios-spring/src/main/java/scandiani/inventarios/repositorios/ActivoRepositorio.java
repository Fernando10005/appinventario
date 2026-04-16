package scandiani.inventarios.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import scandiani.inventarios.modelos.Activo;

import java.util.List;
import java.util.Optional;

public interface ActivoRepositorio extends JpaRepository<Activo, Integer> {

    Optional<Activo> findByNumeroSerie(String numeroSerie);

    List<Activo> findByNumeroSerieContainingIgnoreCase(String numeroSerie);

    List<Activo> findByEstado(String estado);

    List<Activo> findByEmpleado_IdEmpleado(Integer idEmpleado);

    @Query("SELECT COUNT(a) FROM Activo a WHERE a.estado = :estado")
    long countByEstado(@Param("estado") String estado);

    @Query("SELECT a.categoria, COUNT(a) FROM Activo a GROUP BY a.categoria")
    List<Object[]> countByCategoria();
}
