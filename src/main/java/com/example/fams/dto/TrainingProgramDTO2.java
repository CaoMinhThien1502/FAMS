package com.example.fams.dto;

import com.example.fams.dto.User.UserDTO;
import com.example.fams.models.training.TrainingProgramSyllabus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TrainingProgramDTO2 {
    private String trainingProgramCode;
    private String name;
    private LocalDate starTime;
    private int duration;
    private String generalInf;
    private String status;
    private String createBy;
    private LocalDate createDate;
    private String modifiedBy;
    private LocalDate modifiedDate;
    private UserDTO user;
    private List<TrainingProgramSyllabus> syllabusList;
}
