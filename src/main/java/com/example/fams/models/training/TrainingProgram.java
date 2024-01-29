package com.example.fams.models.training;

import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_training_program")
public class TrainingProgram {

    @Id
//    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String trainingProgramCode;

    @Column(nullable = false, columnDefinition = "varchar(50)")
    @NotBlank(message = "Name cannot be blank")
    private String name;

    private LocalDate starTime;

    private int duration;

    @Column(columnDefinition = "varchar(100)")
    private String generalInf;

    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String status;

    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String createBy;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate createDate;

    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String modifiedBy;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate modifiedDate;


    @ManyToOne
    @JoinColumn(name = "user_id", columnDefinition = "bigint")
    private User user;

    @OneToMany(mappedBy = "trainingProgram")
    @JsonIgnore
    private Set<TrainingProgramSyllabus> trainingProgramSyllabus;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private Set<ClassSubject> classSubjects;

}
