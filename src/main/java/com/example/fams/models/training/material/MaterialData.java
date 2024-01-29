package com.example.fams.models.training.material;

import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.models.training.TrainingContent;
import lombok.*;
import org.hibernate.annotations.Type;

import jakarta.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_material_data")
public class MaterialData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    @Column(
            nullable = false,
            columnDefinition = "varchar(50)"
    )
    private String name;
    @Column(
            columnDefinition = "varchar(50)"
    )
    private String createBy;

    private LocalDate createDate;

    @ManyToOne
    @JoinColumn(nullable = false, columnDefinition = "varchar(20)")
    private TrainingContent trainingContent;

    @Column(name = "materialdata",length = 99999)
    private byte[] materialData;
}
