package com.example.fams.models.syllabus;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.example.fams.models.syllabus.LearningObjective;
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
@Table(name = "tbl_syllabus_objective")
public class SyllabusObjective {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSO;

    @ManyToOne
    @JoinColumn(name = "syllabus_id")
    @JsonIgnore
    private Syllabus syllabusId;
    @ManyToOne
    @JoinColumn(name = "objective_code", nullable = false, columnDefinition = "varchar(20)")
    @JsonIgnore
    private LearningObjective objectiveCode;

    public SyllabusObjective(Syllabus syllabusId, LearningObjective objectiveCode) {
        this.syllabusId = syllabusId;
        this.objectiveCode = objectiveCode;
    }
}
