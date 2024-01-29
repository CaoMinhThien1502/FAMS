package com.example.fams.models.training;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.example.fams.models.syllabus.Syllabus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_training_program_syllabus")
public class TrainingProgramSyllabus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTPS;

    @Column(columnDefinition = "varchar(255)")
    public String sequence;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "syllabus_id", nullable = false)
    public Syllabus syllabus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "training_program_code", nullable = false, columnDefinition = "varchar(20)")
    public TrainingProgram trainingProgram;
}
