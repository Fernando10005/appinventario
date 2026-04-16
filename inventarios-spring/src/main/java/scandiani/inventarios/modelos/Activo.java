package scandiani.inventarios.modelos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "activos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Activo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idActivo;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @Column(nullable = false, unique = true, length = 100)
    private String numeroSerie;

    @Column(nullable = false, length = 100)
    private String categoria;

    @Column(nullable = false, length = 20)
    private String estado; // "disponible" | "asignado"

    // Relacion con empleado (puede ser null si esta disponible)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_empleado", nullable = true)
    private Empleado empleado;
}
