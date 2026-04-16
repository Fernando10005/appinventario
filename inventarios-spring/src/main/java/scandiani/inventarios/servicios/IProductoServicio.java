package scandiani.inventarios.servicios;

import scandiani.inventarios.modelos.Producto;

import java.util.List;

public interface IProductoServicio {

    public List<Producto> listarProductos();

    public Producto buscarProductoPorId(Integer idProducto);

    public Producto guardadProducto(Producto producto);

    public void eliminarProductoPorId(Integer idProducto);

}//interface
