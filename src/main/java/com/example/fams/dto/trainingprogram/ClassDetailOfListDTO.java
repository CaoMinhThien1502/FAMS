package com.example.fams.dto.trainingprogram;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Component
public class ClassDetailOfListDTO {
    private Long classId;
    private String className;
    private String classCode;
    private LocalDate createDate;
    private String createBy;
    private Integer duration;
    private String status;
    private String location;
    private String fsu;
}
