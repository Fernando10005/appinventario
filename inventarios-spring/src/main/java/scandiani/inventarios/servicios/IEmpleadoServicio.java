package scandiani.inventarios.servicios;

import scandiani.inventarios.modelos.Empleado;

import java.util.List;

public interface IEmpleadoServicio {
    List<Empleado> listarEmpleados();
    Empleado buscarPorId(Integer id);
    Empleado guardarEmpleado(Empleado empleado);
    void eliminarEmpleado(Integer id);
    List<Empleado> buscarPorNombre(String nombre);
}
