package com.example.fams.models.training;

import com.example.fams.models.syllabus.Syllabus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_training_unit")
public class TrainingUnit {
    @Id
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String unitCode;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String unitName;
    private Integer unitNumber;
    private Integer dayNumber;
    @ManyToOne
    @JoinColumn(name = "syllabus_id")
    @JsonIgnore
    private Syllabus syllabusId;

    @OneToMany(mappedBy = "unitCode", orphanRemoval = true)
    @JsonIgnore
    private Set<TrainingContent> trainingContents;
}
