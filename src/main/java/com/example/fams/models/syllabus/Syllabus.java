package com.example.fams.models.syllabus;

import com.example.fams.models.training.TrainingUnit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.example.fams.models.training.TrainingProgramSyllabus;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "tbl_syllabus")
public class Syllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long syllabusId;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String topicCode;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String topicName;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String technicalGroup;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String version;
    @Column(nullable = false)
    private Integer trainingAudience;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String topicOutline;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingMaterials;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String priority;
    @Column(nullable = false, columnDefinition = "varchar(10)")
    private String publicStatus;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String createBy;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate createDate;
    @Column(columnDefinition = "varchar(50)")
    private String modifiedBy;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate modifiedDate;
//    private Integer attendeeNumber;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String status;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String assessmentScheme;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingPrinciplesTraining;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingPrinciplesRetest;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingPrinciplesMarking;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingPrinciplesCriteria;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trainingPrinciplesOthers;



    @OneToMany(mappedBy = "syllabus", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<TrainingProgramSyllabus> trainingProgramSyllabus = new HashSet<>();

    @OneToMany(mappedBy = "syllabusId", orphanRemoval = true)
    @JsonIgnore
    private Set<SyllabusObjective> syllabusObjective = new HashSet<>();

    @OneToMany(mappedBy = "syllabusId", orphanRemoval = true)
    @JsonIgnore
    private Set<TrainingUnit> trainingUnits = new HashSet<>();
}
