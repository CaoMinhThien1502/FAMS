package com.example.fams.models.training;

import com.example.fams.models.training.material.MaterialData;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.example.fams.models.syllabus.LearningObjective;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_training_content")
public class TrainingContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String content;

    @Column( columnDefinition = "varchar(50)")
    private String type;

    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String deliveryType;

    private Integer duration;

    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String trainingFormat;

    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String note;

    @ManyToOne
    @JoinColumn(name = "unit_code",  columnDefinition = "varchar(20)")
    private TrainingUnit unitCode;

    @ManyToOne
    @JoinColumn(columnDefinition = "varchar(20)")
    @JsonIgnore
    private LearningObjective learningObjective;

//    @OneToMany(mappedBy = "trainingContent", orphanRemoval = true)
//    @JsonIgnore
//    private Set<MaterialData> materialData = new HashSet<>() ;
}
