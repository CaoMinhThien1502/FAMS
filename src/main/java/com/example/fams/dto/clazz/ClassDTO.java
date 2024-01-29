package com.example.fams.dto.clazz;

import com.example.fams.dto.TrainingProgramDTO2;
import com.example.fams.models.attendee.Attendee;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ClassDTO {

    private Long classId;
    @NotBlank(message = "Class name is required")
    private String className;
    @NotBlank(message = "Class code is required")
    private String classCode;
    private Integer duration;
    private String status;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeFrom;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeTo;
    private String location;
    private String classTime;
    @NotBlank(message = "FSU is required")
    private String fsu;
    private LocalDate startDate;
    private LocalDate endDate;
    private String createBy;
    private LocalDate createDate;
    private String modifiedBy;
    private LocalDate modifiedDate;
    private Attendee attendee;
    private TrainingProgramDTO2 trainingProgram;
    private String dateLearning;

    @NotBlank(message = "Training program is required")
    private String trainingProgramId;
}
