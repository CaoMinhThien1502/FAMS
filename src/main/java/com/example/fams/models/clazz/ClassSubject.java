package com.example.fams.models.clazz;

import com.example.fams.models.attendee.Attendee;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_class")
public class ClassSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String className;
//    @Pattern(regexp = "^[A-Z]{3}"+"-"+"[0-9]{2}"+"-"+"[0-9]{2}", message = "Location Code-Current Year(yy)-Incremental Number (01-99)")
    @Column( columnDefinition = "varchar(50)")
    private String classCode;
    private Integer duration;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String status;
    @DateTimeFormat(pattern = "HH/mm")
    private LocalTime timeFrom;
    @DateTimeFormat(pattern = "HH/mm")
    private LocalTime timeTo;
    @Column( columnDefinition = "varchar(255)")
    private String location;
    @Column(columnDefinition = "varchar(255)")
    private String classTime;
    @Column( columnDefinition = "varchar(255)")
    private String fsu;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;
    @Column( columnDefinition = "varchar(50)")
    private String createBy;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private LocalDate createDate;
    private String modifiedBy;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate modifiedDate;
    @Column(columnDefinition = "varchar(50)")
    private String dateLearning;

    @ManyToOne
    @JoinColumn(name = "training_program_code")
    private TrainingProgram trainingProgram;

    @OneToMany(mappedBy = "clazz")
    @JsonIgnore
    private Set<ClassUser> classUsers;

    @OneToOne()
    @JoinColumn(name = "attendee_id")
    private Attendee attendee;

}
