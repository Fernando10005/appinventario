package scandiani.inventarios.modelos;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "historial_asignaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HistorialAsignacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistorial;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_activo", nullable = false)
    private Activo activo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    @Column(nullable = false)
    private LocalDate fechaAsignacion;

    @Column(nullable = true)
    private LocalDate fechaDevolucion;
}
