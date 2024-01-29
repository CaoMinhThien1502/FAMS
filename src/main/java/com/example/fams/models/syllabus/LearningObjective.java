package com.example.fams.models.syllabus;

import com.example.fams.models.training.TrainingContent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_learning_objective")
@ToString
public class LearningObjective {

    @Id
//    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String code;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String name;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String type;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "objectiveCode", orphanRemoval = true)
    @JsonIgnore
    private Set<SyllabusObjective> syllabusObjective = new HashSet<>();

    @OneToMany(mappedBy = "learningObjective", orphanRemoval = true)
    @JsonIgnore
    private Set<TrainingContent> trainingContents = new HashSet<>();
}
