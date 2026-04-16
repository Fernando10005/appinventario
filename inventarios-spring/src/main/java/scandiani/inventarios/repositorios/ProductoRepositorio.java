package scandiani.inventarios.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import scandiani.inventarios.modelos.Producto;

public interface ProductoRepositorio extends JpaRepository<Producto, Integer> {
}
